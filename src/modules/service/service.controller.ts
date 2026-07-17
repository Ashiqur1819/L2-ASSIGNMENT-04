import { Request, Response } from "express";
import httpStatus from "http-status";
import { serviceService } from "./service.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.createService(req.user!.userId, req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Service created successfully",
    data: result,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Service created successfully",
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.updateService(
    req.user!.userId,
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  await serviceService.deleteService(req.user!.userId, req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: null,
  });
});

const getMyServices = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getMyServices(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My services retrieved successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getAllServices(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const result = await serviceService.getSingleService(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});

export const serviceController = {
  createService,
  updateService,
  deleteService,
  getMyServices,
  getAllServices,
  getSingleService,
};
