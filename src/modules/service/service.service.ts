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

const getAllServices = async () => {
  const result = await prisma.service.findMany({
    where: {
      isAvailable: true,
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
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return result;
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

export const ServiceService = {
  createService,
//   updateService,
//   deleteService,
//   getMyServices,
//   getAllServices,
//   getSingleService,
};