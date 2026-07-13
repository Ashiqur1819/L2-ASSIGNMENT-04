import { Request, Response } from "express";
import httpStatus from "http-status";
import { TechnicianProfileService } from "./technicianProfile.service";

const createTechnicianProfile = async (req: Request, res: Response) => {
  try {
    const result = await TechnicianProfileService.createTechnicianProfile(
      req.user!.userId,
      req.body,
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Technician profile created successfully",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

// const updateTechnicianProfile = async (req: Request, res: Response) => {
//   try {
//     const result = await TechnicianProfileService.updateTechnicianProfile(
//       req.user!.userId,
//       req.body,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Technician profile updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const getMyProfile = async (req: Request, res: Response) => {
//   try {
//     const result = await TechnicianProfileService.getMyProfile(
//       req.user!.userId,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Profile retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const getSingleTechnician = async (req: Request, res: Response) => {
//   try {
//     const result = await TechnicianProfileService.getSingleTechnician(
//       req.params.id,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Technician retrieved successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

export const TechnicianProfileController = {
  createTechnicianProfile,
//   updateTechnicianProfile,
//   getMyProfile,
//   getSingleTechnician,
};