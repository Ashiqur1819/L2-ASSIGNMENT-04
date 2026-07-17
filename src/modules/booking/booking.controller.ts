import { Request, Response } from "express";
import httpStatus from "http-status";
import { bookingService } from "./booking.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.createBooking(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getMyBookings(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getSingleBooking(
    req.user!.userId,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking retrieved successfully",
    data: result,
  });
});

const getTechnicianBookings = catchAsync(
  async (req: Request, res: Response) => {
    const result = await bookingService.getTechnicianBookings(req.user!.userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Technician bookings retrieved successfully",
      data: result,
    });
  },
);

const updateBookingStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.updateBookingStatus(
    req.user!.userId,
    req.params.id as string,
    req.body.status,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking status updated successfully",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.cancelBooking(
    req.user!.userId,
    req.params.id as string,
    req.body?.cancelReason,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getMyBookings,
  getSingleBooking,
  getTechnicianBookings,
  updateBookingStatus,
  cancelBooking,
};
