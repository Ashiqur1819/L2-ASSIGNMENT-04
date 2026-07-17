import { Request, Response } from "express";
import httpStatus from "http-status";
import { Status } from "../../../generated/prisma/enums";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllUsers();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Users retrieved successfully",
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

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;

    const result = await adminService.updateUserStatus(
      req.params.id as string,
      status as Status,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "User status updated successfully",
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

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllBookings();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Bookings retrieved successfully",
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

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await adminService.getAllCategories();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Categories retrieved successfully",
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

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const result = await adminService.createCategory(name);

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Category created successfully",
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

// const updateCategory = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.body;

//     const result = await adminService.updateCategory(
//       req.params.id as string,
//       name,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Category updated successfully",
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

// const deleteCategory = async (req: Request, res: Response) => {
//   try {
//     await adminService.deleteCategory(req.params.id as string);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Category deleted successfully",
//       data: null,
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const deleteService = async (req: Request, res: Response) => {
//   try {
//     await adminService.deleteService(req.params.id as string);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Service deleted successfully",
//       data: null,
//     });
//   } catch (error) {
//     res.status(httpStatus.BAD_REQUEST).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

// const getDashboardStats = async (req: Request, res: Response) => {
//   try {
//     const result = await adminService.getDashboardStats();

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Dashboard statistics retrieved successfully",
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

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getAllCategories,
  createCategory,
//   updateCategory,
//   deleteCategory,
//   deleteService,
//   getDashboardStats,
};