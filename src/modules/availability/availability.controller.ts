import { Request, Response } from "express";
import httpStatus from "http-status";
import { availabilityService } from "./availability.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createAvailability = catchAsync(async (req: Request, res: Response) => {
  const result = await availabilityService.createAvailability(
    req.user!.userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Availability created successfully",
    data: result,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const result = await availabilityService.updateAvailability(
    req.user!.userId,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability updated successfully",
    data: result,
  });
});

const deleteAvailability = catchAsync(async (req: Request, res: Response) => {
  await availabilityService.deleteAvailability(
    req.user!.userId,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability deleted successfully",
    data: null,
  });
});

const getMyAvailability = catchAsync(async (req: Request, res: Response) => {
  const result = await availabilityService.getMyAvailability(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability retrieved successfully",
    data: result,
  });
});

const getTechnicianAvailability = catchAsync(
  async (req: Request, res: Response) => {
    const result = await availabilityService.getTechnicianAvailability(
      req.params.technicianId as string,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Availability retrieved successfully",
      data: result,
    });
  },
);

export const availabilityController = {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getMyAvailability,
  getTechnicianAvailability,
};
