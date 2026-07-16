import express, { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { PaymentController } from "./payment.controller";

const router = Router();

/* ===========================
   Stripe Webhook
=========================== */

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   PaymentController.stripeWebhook,
// );

/* ===========================
   Customer Routes
=========================== */

// Create Payment Intent
router.post(
  "/create",
  auth(Role.CUSTOMER),
  PaymentController.createPaymentIntent,
);

// Get My Payments
// router.get(
//   "/",
//   auth(Role.CUSTOMER),
//   PaymentController.getMyPayments,
// );

// Get Single Payment
// router.get(
//   "/:id",
//   auth(Role.CUSTOMER),
//   PaymentController.getSinglePayment,
// );

export const paymentRouter = router;