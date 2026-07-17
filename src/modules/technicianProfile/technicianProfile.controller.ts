import { Request, Response } from "express";
import httpStatus from "http-status";
import { TechnicianProfileService } from "./technicianProfile.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createTechnicianProfile = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TechnicianProfileService.createTechnicianProfile(
      req.user!.userId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Technician profile created successfully",
      data: result,
    });
  },
);

const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TechnicianProfileService.updateTechnicianProfile(
      req.user!.userId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Technician profile updated successfully",
      data: result,
    });
  },
);

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianProfileService.getMyProfile(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully",
    data: result,
  });
});

const getSingleTechnician = catchAsync(async (req: Request, res: Response) => {
  const result = await TechnicianProfileService.getSingleTechnician(
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Technician retrieved successfully",
    data: result,
  });
});

export const TechnicianProfileController = {
  createTechnicianProfile,
  updateTechnicianProfile,
  getMyProfile,
  getSingleTechnician,
};
