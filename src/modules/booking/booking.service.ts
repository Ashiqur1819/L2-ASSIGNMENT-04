import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";
import { IBooking } from "./booking.interface";

const createBooking = async (
  userId: string,
  payload: IBooking,
) => {
  // Customer Check
  const customer = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  // Service Check
  const service = await prisma.service.findUnique({
    where: {
      id: payload.serviceId,
    },
    include: {
      technicianProfile: true,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (!service.isAvailable) {
    throw new Error("Service is not available");
  }

  // Availability Check
  const availability = await prisma.availability.findUnique({
    where: {
      id: payload.availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (!availability.isAvailable) {
    throw new Error("Selected slot is unavailable");
  }

  // Ensure slot belongs to the service's technician
  if (availability.technicianId !== service.technicianProfileId) {
    throw new Error("Invalid availability selected");
  }

  // Convert booking date to Date object
  const bookingDate = new Date(payload.bookingDate);

  if (isNaN(bookingDate.getTime())) {
    throw new Error("Invalid booking date");
  }

  // Prevent duplicate booking for same slot/date
  const existingBooking = await prisma.booking.findFirst({
    where: {
      availabilityId: payload.availabilityId,
      bookingDate,
      status: {
        in: [
          BookingStatus.REQUESTED,
          BookingStatus.ACCEPTED,
          BookingStatus.PAID,
          BookingStatus.IN_PROGRESS,
        ],
      },
    },
  });

  if (existingBooking) {
    throw new Error("This slot is already booked");
  }

  // Extract date part (YYYY-MM-DD)
  const date = bookingDate.toISOString().split("T")[0];

  // Create full datetime for slot
  const startTime = new Date(`${date}T${availability.startTime}:00`);
  const endTime = new Date(`${date}T${availability.endTime}:00`);

  // Create Booking
  const result = await prisma.booking.create({
    data: {
      customerId: userId,
      technicianId: service.technicianProfileId,
      serviceId: payload.serviceId,
      availabilityId: payload.availabilityId,
      bookingDate,
      startTime,
      endTime,
      address: payload.address,
      problemDescription: payload.problemDescription,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },
      service: true,
      availability: true,
    },
  });

  return result;
};

const getMyBookings = async (userId: string) => {
  const result = await prisma.booking.findMany({
    where: {
      customerId: userId,
    },

    include: {
      service: {
        include: {
          category: true,
        },
      },

      technician: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },

      availability: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleBooking = async (
  userId: string,
  bookingId: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      technician: {
        include: {
          user: {
            omit: {
              password: true,
            },
          },
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      availability: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Only customer or assigned technician can view
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  const isCustomer = booking.customerId === userId;

  const isTechnician =
    technicianProfile &&
    booking.technicianId === technicianProfile.id;

  if (!isCustomer && !isTechnician) {
    throw new Error("You are not authorized");
  }

  return booking;
};

const getTechnicianBookings = async (userId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.booking.findMany({
    where: {
      technicianId: technicianProfile.id,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      availability: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const updateBookingStatus = async (
  userId: string,
  bookingId: string,
  status: BookingStatus,
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.technicianId !== technicianProfile.id) {
    throw new Error("You are not authorized");
  }

  // Technician can only perform these transitions
  switch (booking.status) {
    case BookingStatus.REQUESTED:
      if (
        status !== BookingStatus.ACCEPTED &&
        status !== BookingStatus.DECLINED
      ) {
        throw new Error(
          "Booking can only be ACCEPTED or DECLINED",
        );
      }
      break;

    case BookingStatus.PAID:
      if (status !== BookingStatus.IN_PROGRESS) {
        throw new Error(
          "Only PAID bookings can be marked as IN_PROGRESS",
        );
      }
      break;

    case BookingStatus.IN_PROGRESS:
      if (status !== BookingStatus.COMPLETED) {
        throw new Error(
          "Only IN_PROGRESS bookings can be marked as COMPLETED",
        );
      }
      break;

    default:
      throw new Error(
        `Cannot change status from ${booking.status}`,
      );
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status,
    },
    include: {
      customer: true,
      technician: {
        include: {
          user: true,
        },
      },
      service: true,
      availability: true,
    },
  });

  return result;
};

const cancelBooking = async (
  userId: string,
  bookingId: string,
  cancelReason: string,
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.customerId !== userId) {
    throw new Error("You are not authorized");
  }

  if (
    booking.status === BookingStatus.IN_PROGRESS ||
    booking.status === BookingStatus.COMPLETED
  ) {
    throw new Error(
      "Booking cannot be cancelled after work has started",
    );
  }

  const result = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: BookingStatus.CANCELLED,
      cancelReason,
    },
  });

  return result;
};

export const bookingService = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  getTechnicianBookings,
  updateBookingStatus,
  // cancelBooking,
};