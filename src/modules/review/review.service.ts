import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IReview } from "./review.interface";

const createReview = async (userId: string, payload: IReview) => {
  // Booking Check
  const booking = await prisma.booking.findUnique({
    where: {
      id: payload.bookingId,
    },
    include: {
      technician: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Only booking owner can review
  if (booking.customerId !== userId) {
    throw new Error("You are not authorized");
  }

  // Booking must be completed
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new Error("Review can only be submitted after job completion");
  }

  // Prevent duplicate review
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already submitted");
  }

  const result = await prisma.$transaction(async (tx) => {
    // Create Review
    const review = await tx.review.create({
      data: {
        bookingId: payload.bookingId,
        customerId: userId,
        technicianId: booking.technicianId,
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    // Get all technician reviews
    const reviews = await tx.review.findMany({
      where: {
        technicianId: booking.technicianId,
      },
    });

    const totalRating = reviews.reduce((sum, review) => {
      return sum + review.rating;
    }, 0);

    const averageRating = Number((totalRating / reviews.length).toFixed(1));

    await tx.technicianProfile.update({
      where: {
        id: booking.technicianId,
      },
      data: {
        averageRating,
      },
    });

    return review;
  });

  return result;
};

const getAllReviews = async () => {
  const result = await prisma.review.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      technician: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      booking: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getSingleReview = async (reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      technician: {
        include: {
          user: true,
        },
      },
      booking: true,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return review;
};

const getTechnicianReviews = async (technicianId: string) => {
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId,
    },
  });

  if (!technician) {
    throw new Error("Technician not found");
  }

  const reviews = await prisma.review.findMany({
    where: {
      technicianId,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      booking: {
        select: {
          id: true,
          bookingDate: true,
          status: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

const updateReview = async (
  userId: string,
  reviewId: string,
  payload: Partial<IReview>,
) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.customerId !== userId) {
    throw new Error("You are not authorized");
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedReview = await tx.review.update({
      where: {
        id: reviewId,
      },
      data: {
        rating: payload.rating,
        comment: payload.comment,
      },
    });

    const reviews = await tx.review.findMany({
      where: {
        technicianId: review.technicianId,
      },
    });

    const totalRating = reviews.reduce((sum, item) => {
      return sum + item.rating;
    }, 0);

    const averageRating = totalRating / reviews.length;

    await tx.technicianProfile.update({
      where: {
        id: review.technicianId,
      },
      data: {
        averageRating,
      },
    });

    return updatedReview;
  });

  return result;
};

const deleteReview = async (userId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.customerId !== userId) {
    throw new Error("You are not authorized");
  }

  await prisma.$transaction(async (tx) => {
    await tx.review.delete({
      where: {
        id: reviewId,
      },
    });

    const reviews = await tx.review.findMany({
      where: {
        technicianId: review.technicianId,
      },
    });

    let averageRating = 0;

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, item) => {
        return sum + item.rating;
      }, 0);

      averageRating = Number((totalRating / reviews.length).toFixed(1));
    }

    await tx.technicianProfile.update({
      where: {
        id: review.technicianId,
      },
      data: {
        averageRating,
      },
    });
  });

  return null;
};

export const reviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  getTechnicianReviews,
  updateReview,
  deleteReview,
};
