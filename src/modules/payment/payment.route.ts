import express, { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";

const router = Router();



/* ===========================
   Customer Routes
=========================== */

// Create Payment Intent
router.post(
  "/create",
  auth(Role.CUSTOMER),
  paymentController.createPaymentIntent,
);

// Get My Payments
router.get(
  "/",
  auth(Role.CUSTOMER),
  paymentController.getMyPayments,
);

// Get Single Payment
router.get(
  "/:id",
  auth(Role.CUSTOMER),
  paymentController.getSinglePayment,
);

export const paymentRouter = router;