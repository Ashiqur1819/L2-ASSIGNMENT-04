import { Request, Response } from "express";
import httpStatus from "http-status";
import { categoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.createCategory(req.body);

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

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategories();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const getSingleCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await categoryService.getSingleCategory(id as string);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Category retrieved successfully",
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

const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await categoryService.updateCategory(id as string, req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Category updated successfully",
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

// const deleteCategory = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     await categoryService.deleteCategory(id as string);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Category deleted successfully",
//     });
//   } catch (error) {
//     res.status(httpStatus.NOT_FOUND).json({
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Something went wrong",
//     });
//   }
// };

export const categoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
//   deleteCategory,
};