import { Request, Response } from "express";
import httpStatus from "http-status";
import { availabilityService } from "./availability.service";

const createAvailability = async (req: Request, res: Response) => {
  try {
    const result = await availabilityService.createAvailability(
      req.user!.userId,
      req.body,
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Availability created successfully",
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

const updateAvailability = async (req: Request, res: Response) => {
  try {
    const result = await availabilityService.updateAvailability(
      req.user!.userId,
      req.params.id as string,
      req.body,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Availability updated successfully",
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

const deleteAvailability = async (req: Request, res: Response) => {
  try {
    await availabilityService.deleteAvailability(
      req.user!.userId,
      req.params.id as string,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Availability deleted successfully",
    });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const getMyAvailability = async (req: Request, res: Response) => {
  try {
    const result = await availabilityService.getMyAvailability(
      req.user!.userId,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Availability retrieved successfully",
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

const getTechnicianAvailability = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await availabilityService.getTechnicianAvailability(
      req.params.technicianId as string,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Availability retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const availabilityController = {
  createAvailability,
  updateAvailability,
  deleteAvailability,
  getMyAvailability,
  getTechnicianAvailability,
};