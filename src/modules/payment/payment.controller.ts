import { Request, Response } from "express";
import httpStatus from "http-status";
import Stripe from "stripe";
import config from "../../config";
import { stripe } from "../../config/stripe";
import { paymentService } from "./payment.service";

const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.body;

    const result = await paymentService.createPaymentIntent(req.user!.userId, bookingId);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Payment intent created successfully",
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

const stripeWebhook = async (req: Request, res: Response) => {
    console.log("Controller Hit");
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Stripe signature is missing",
    });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.STRIPE_WEBHOOK_SECRET as string,
    );

    console.log("========================");
console.log("EVENT TYPE:", event.type);
console.log("========================");

    await paymentService.stripeWebhook(event);

    res.status(httpStatus.OK).json({
      received: true,
    });
  } catch (error) {
  console.error("WEBHOOK ERROR:", error);

  return res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: error instanceof Error ? error.message : "Webhook Error",
  });
}
};

// const getMyPayments = async (req: Request, res: Response) => {
//   try {
//     const result = await paymentService.getMyPayments(req.user!.userId);

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Payments retrieved successfully",
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

// const getSinglePayment = async (req: Request, res: Response) => {
//   try {
//     const result = await paymentService.getSinglePayment(
//       req.user!.userId,
//       req.params.id as string,
//     );

//     res.status(httpStatus.OK).json({
//       success: true,
//       message: "Payment retrieved successfully",
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

export const paymentController = {
  createPaymentIntent,
  stripeWebhook,
//   getMyPayments,
//   getSinglePayment,
};