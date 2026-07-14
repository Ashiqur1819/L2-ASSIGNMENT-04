import { prisma } from "../../lib/prisma";
import {
  IAvailability,
  IUpdateAvailability,
} from "./availability.interface";

const createAvailability = async (
  userId: string,
  payload: IAvailability,
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  if (payload.startTime >= payload.endTime) {
    throw new Error("End time must be greater than start time");
  }

  const existingSlots = await prisma.availability.findMany({
    where: {
      technicianId: technicianProfile.id,
      day: payload.day,
    },
  });

  const isOverlapping = existingSlots.some((slot) => {
    return (
      payload.startTime < slot.endTime &&
      payload.endTime > slot.startTime
    );
  });

  if (isOverlapping) {
    throw new Error("Time slot overlaps with an existing slot");
  }

  const result = await prisma.availability.create({
    data: {
      technicianId: technicianProfile.id,
      ...payload,
    },
  });

  return result;
};

const updateAvailability = async (
  userId: string,
  availabilityId: string,
  payload: IUpdateAvailability,
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (availability.technicianId !== technicianProfile.id) {
    throw new Error("You are not authorized to update this slot");
  }

  const startTime =
    payload.startTime ?? availability.startTime;

  const endTime =
    payload.endTime ?? availability.endTime;

  if (startTime >= endTime) {
    throw new Error("End time must be greater than start time");
  }

  const existingSlots = await prisma.availability.findMany({
    where: {
      technicianId: technicianProfile.id,
      day: payload.day ?? availability.day,
      NOT: {
        id: availabilityId,
      },
    },
  });

  const isOverlapping = existingSlots.some((slot) => {
    return (
      startTime < slot.endTime &&
      endTime > slot.startTime
    );
  });

  if (isOverlapping) {
    throw new Error("Time slot overlaps with an existing slot");
  };

  const result = await prisma.availability.update({
    where: {
      id: availabilityId,
    },
    data: payload,
  });

  return result;
};

const deleteAvailability = async (
  userId: string,
  availabilityId: string,
) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const availability = await prisma.availability.findUnique({
    where: {
      id: availabilityId,
    },
  });

  if (!availability) {
    throw new Error("Availability not found");
  }

  if (availability.technicianId !== technicianProfile.id) {
    throw new Error("You are not authorized to delete this availability");
  }

  await prisma.availability.delete({
    where: {
      id: availabilityId,
    },
  });

  return null;
};

const getMyAvailability = async (userId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician profile not found");
  }

  const result = await prisma.availability.findMany({
    where: {
      technicianId: technicianProfile.id,
    },
    orderBy: [
      {
        day: "asc",
      },
      {
        startTime: "asc",
      },
    ],
  });

  return result;
};

const getTechnicianAvailability = async (technicianId: string) => {
  const technicianProfile = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId,
    },
  });

  if (!technicianProfile) {
    throw new Error("Technician not found");
  }

  const result = await prisma.availability.findMany({
    where: {
      technicianId,
      isAvailable: true,
    },
    orderBy: [
      {
        day: "asc",
      },
      {
        startTime: "asc",
      },
    ],
  });

  return result;
};

export const availabilityService = {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getMyAvailability,
  // getTechnicianAvailability,
};