import { prisma } from "../../../lib/prisma";
import {
  ITechnicianProfile,
  IUpdateTechnicianProfile,
} from "./technicianProfile.interface";


const createTechnicianProfile = async (
  userId: string,
  payload: ITechnicianProfile,
) => {
  const isProfileExists = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (isProfileExists) {
    throw new Error("Technician profile already exists");
  }

  const result = await prisma.technicianProfile.create({
    data: {
      userId,
      ...payload,
    },
  });

  return result;
};

// const updateTechnicianProfile = async (
//   userId: string,
//   payload: IUpdateTechnicianProfile,
// ) => {
//   const profile = await prisma.technicianProfile.findUnique({
//     where: {
//       userId,
//     },
//   });

//   if (!profile) {
//     throw new Error("Technician profile not found");
//   }

//   const result = await prisma.technicianProfile.update({
//     where: {
//       userId,
//     },
//     data: payload,
//   });

//   return result;
// };

// const getMyProfile = async (userId: string) => {
//   const result = await prisma.technicianProfile.findUnique({
//     where: {
//       userId,
//     },
//     include: {
//       user: {
//         select: {
//           id: true,
//           name: true,
//           email: true,
//           phone: true,
//         },
//       },
//       services: true,
//       availabilities: true,
//     },
//   });

//   if (!result) {
//     throw new Error("Technician profile not found");
//   }

//   return result;
// };


// const getSingleTechnician = async (id: string) => {
//   const result = await prisma.technicianProfile.findUnique({
//     where: {
//       id,
//     },
//     include: {
//       user: {
//         select: {
//           id: true,
//           name: true,
//         },
//       },
//       services: true,
//       availabilities: true,
//       bookings: true,
//     },
//   });

//   if (!result) {
//     throw new Error("Technician not found");
//   }

//   return result;
// };

export const TechnicianProfileService = {
  createTechnicianProfile,
//   updateTechnicianProfile,
//   getMyProfile,
//   getSingleTechnician,
};