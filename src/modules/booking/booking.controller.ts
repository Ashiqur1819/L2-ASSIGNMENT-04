import { Request, Response } from "express";
import httpStatus from "http-status";
import { bookingService } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.createBooking(
      req.user!.userId,
      req.body,
    );

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Booking created successfully",
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

const getMyBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getMyBookings(req.user!.userId);

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

const getSingleBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingService.getSingleBooking(
      req.user!.userId,
      req.params.id as string,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Booking retrieved successfully",
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

const getTechnicianBookings = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await bookingService.getTechnicianBookings(
      req.user!.userId,
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Technician bookings retrieved successfully",
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

// const updateBookingStatus = async (
//   req: Request,
//   res: Response,
// ) => {
//   try {
//     const result = await bookingService.updateBookingStatus(
//       req.user!.userId,
//       req.params.id as string,
//       req.body.status,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Booking status updated successfully",
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

// const cancelBooking = async (req: Request, res: Response) => {
//   try {
//     const result = await bookingService.cancelBooking(
//       req.user!.userId,
//       req.params.id as string,
//       req.body.cancelReason,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Booking cancelled successfully",
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

export const bookingController = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  getTechnicianBookings,
  // updateBookingStatus,
  // cancelBooking,
};