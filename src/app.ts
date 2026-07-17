import express, { Application } from "express";
import { authRouter } from "./modules/auth/auth.route";
import cookieParser from "cookie-parser";
import { technicianProfileRouter } from "./modules/technicianProfile/technicianProfile.route";
import { categoryRouter } from "./modules/category/category.route";
import { serviceRouter } from "./modules/service/service.route";
import { availabilityRouter } from "./modules/availability/availability.route";
import { bookingRouter } from "./modules/booking/booking.route";
import { paymentRouter } from "./modules/payment/payment.route";
import { paymentController } from "./modules/payment/payment.controller";
import { reviewRouter } from "./modules/review/review.route";
import { adminRouter } from "./modules/admin/admin.route";
import notFound from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app: Application = express();

// Stripe Webhook Route
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentController.stripeWebhook,
);

// Other Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/technician-profile", technicianProfileRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/services", serviceRouter);
app.use("/api/availabilities", availabilityRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);

// Not Found Route
app.use(notFound);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
