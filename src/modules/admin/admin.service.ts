import { BookingStatus, PaymentStatus, Role, Status } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
   where: {
        role: {not: Role.ADMIN}
   },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,

      technicianProfile: {
        select: {
          id: true,
          experience: true,
          location: true,
          hourlyRate: true,
          averageRating: true,
          completedJobs: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};

const updateUserStatus = async (
  userId: string,
  status: Status,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await prisma.user.update({
    where: {
      id: userId,
    },
        omit: {
      password: true,
    },
    data: {
      status,
    },
  });

  return result;
};

const getAllBookings = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },

      technician: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },

      service: {
        include: {
          category: true,
        },
      },

      payment: true,
      review: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};

const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          services: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

const createCategory = async (name: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const result = await prisma.category.create({
    data: {
      name,
    },
  });

  return result;
};

const updateCategory = async (
  categoryId: string,
  name: string,
) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      name,
      NOT: {
        id: categoryId,
      },
    },
  });

  if (existingCategory) {
    throw new Error("Category name already exists");
  }

  const result = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name,
    },
  });

  return result;
};

const deleteCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    include: {
      services: true,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  if (category.services.length > 0) {
    throw new Error(
      "Cannot delete category because services exist under this category",
    );
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return null;
};

const deleteService = async (serviceId: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  return null;
};

const getDashboardStats = async () => {
  const [
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalBookings,
    completedBookings,
    totalServices,
    totalCategories,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.user.count({
      where: {
        role: Role.CUSTOMER
      },
    }),

    prisma.user.count({
      where: {
        role: Role.TECHNICIAN,
      },
    }),

    prisma.booking.count(),

    prisma.booking.count({
      where: {
        status: BookingStatus.COMPLETED
      },
    }),

    prisma.service.count(),

    prisma.category.count(),

    prisma.payment.aggregate({
      where: {
        status: PaymentStatus.COMPLETED
      },
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalUsers,
    totalCustomers,
    totalTechnicians,
    totalBookings,
    completedBookings,
    totalServices,
    totalCategories,
    totalRevenue: totalRevenue._sum.amount || 0,
  };
};


export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteService,
//   getDashboardStats,
};