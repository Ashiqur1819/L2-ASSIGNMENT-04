import { Request, Response } from "express";
import httpStatus from "http-status";
import { reviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.createReview(
      req.user!.userId,
      req.body,
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Review created successfully",
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

const getAllReviews = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.getAllReviews();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Reviews retrieved successfully",
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

const getSingleReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.getSingleReview(
      req.params.id as string,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Review retrieved successfully",
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

// const getTechnicianReviews = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     const result = await reviewService.getTechnicianReviews(
//       req.params.technicianId as string,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Technician reviews retrieved successfully",
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

// const updateReview = async (req: Request, res: Response) => {
//   try {
//     const result = await reviewService.updateReview(
//       req.user!.userId,
//       req.params.id as string,
//       req.body,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Review updated successfully",
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

// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     await reviewService.deleteReview(
//       req.user!.userId,
//       req.params.id as string,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Review deleted successfully",
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

export const reviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
//   getTechnicianReviews,
//   updateReview,
//   deleteReview,
};