import { Request, Response } from "express";
import httpStatus from "http-status";
import Stripe from "stripe";
import config from "../../config";
import { stripe } from "../../config/stripe";
import { paymentService } from "./payment.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.body;

  const result = await paymentService.createPaymentIntent(
    req.user!.userId,
    bookingId,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Payment intent created successfully",
    data: result,
  });
});

const stripeWebhook = catchAsync(async (req: Request, res: Response) => {
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Stripe signature is missing",
    });
  }

  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    config.STRIPE_WEBHOOK_SECRET as string,
  );

  await paymentService.stripeWebhook(event);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Webhook triggered successfully.",
    data: null,
  });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getMyPayments(req.user!.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.getSinglePayment(
    req.user!.userId,
    req.params.id as string,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createPaymentIntent,
  stripeWebhook,
  getMyPayments,
  getSinglePayment,
};
