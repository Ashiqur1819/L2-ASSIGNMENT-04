import { Request, Response } from "express";
import httpStatus from "http-status";
import { Status } from "../../../generated/prisma/enums";
import { adminService } from "./admin.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// Controller for retrieving all users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result,
  });
});

// Controller for updating the status of a user
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;

  const result = await adminService.updateUserStatus(
    req.params.id as string,
    status as Status,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User status updated successfully",
    data: result,
  });
});

// Controller for retrieving all bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllBookings();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

// Controller for retrieving all categories
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getAllCategories();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories retrieved successfully",
    data: result,
  });
});

// Controller for creating a new category
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;

  const result = await adminService.createCategory(name);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Categories created successfully",
    data: result,
  });
});

// Controller for updating an existing category
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;

  const result = await adminService.updateCategory(
    req.params.id as string,
    name,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

// Controller for delete category
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  await adminService.deleteCategory(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully",
    data: null,
  });
});

// Controller for delete service
const deleteService = catchAsync(async (req: Request, res: Response) => {
  await adminService.deleteService(req.params.id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service deleted successfully",
    data: null,
  });
});

// Controller for retrieving dashboard stats
const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getDashboardStats();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully",
    data: result,
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteService,
  getDashboardStats,
};
