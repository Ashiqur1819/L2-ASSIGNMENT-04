import { prisma } from "../../lib/prisma";
import { IService, IUpdateService } from "./service.interface";

const createService = async (userId: string, payload: IService) => {
  // Check technician profile
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  // Check category
  const category = await prisma.category.findUnique({
    where: {
      id: payload.categoryId,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // Create service
  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianProfileId: technicianProfile.id,
    },
    include: {
      category: true,
      technicianProfile: {
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
    },
  });

  return result;
};

const updateService = async (
  userId: string,
  serviceId: string,
  payload: IUpdateService,
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (service.technicianProfileId !== technicianProfile.id) {
    throw new Error("You are not authorized to update this service");
  }

  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }
  }

  const result = await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteService = async (userId: string, serviceId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Service not found");
  }

  if (service.technicianProfileId !== technicianProfile.id) {
    throw new Error("You are not authorized to delete this service");
  }

  await prisma.service.delete({
    where: {
      id: serviceId,
    },
  });

  return null;
};

const getMyServices = async (userId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.service.findMany({
    where: {
      technicianProfileId: technicianProfile.id,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
};

const getAllServices = async (query: Record<string, any>) => {
  const {
    searchTerm,
    category,
    location,
    minPrice,
    maxPrice,
    rating,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = "1",
    limit = "10",
  } = query;

  const andConditions: any[] = [
    {
      isAvailable: true,
    },
  ];

  // Search
  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  // Category
  if (category) {
    andConditions.push({
      category: {
        name: {
          equals: category,
          mode: "insensitive",
        },
      },
    });
  }

  // Location
  if (location) {
    andConditions.push({
      technicianProfile: {
        location: {
          contains: location,
          mode: "insensitive",
        },
      },
    });
  }

  // Price Range
  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        gte: minPrice ? Number(minPrice) : undefined,
        lte: maxPrice ? Number(maxPrice) : undefined,
      },
    });
  }

  // Rating
  if (rating) {
    andConditions.push({
      technicianProfile: {
        averageRating: {
          gte: Number(rating),
        },
      },
    });
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const whereCondition = {
    AND: andConditions,
  };

  const [services, total] = await prisma.$transaction([
    prisma.service.findMany({
      where: whereCondition,

      include: {
        category: true,

        technicianProfile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },

      orderBy: {
        [sortBy]: sortOrder,
      },

      skip,
      take: limitNumber,
    }),

    prisma.service.count({
      where: whereCondition,
    }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPage: Math.ceil(total / limitNumber),
    },

    data: services,
  };
};
const getSingleService = async (serviceId: string) => {
  const result = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
    include: {
      category: true,
      technicianProfile: {
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
    },
  });

  if (!result) {
    throw new Error("Service not found");
  }

  return result;
};

export const serviceService = {
  createService,
  updateService,
  deleteService,
  getMyServices,
  getAllServices,
  getSingleService,
};