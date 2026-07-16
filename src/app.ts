import express, { Application } from 'express';
import { authRouter } from './modules/auth/auth.route';
import cookieParser from 'cookie-parser';
import { technicianProfileRouter } from './modules/technicianProfile/technicianProfile.route';
import { categoryRouter } from './modules/category/category.route';
import { serviceRouter } from './modules/service/service.route';
import { availabilityRouter } from './modules/availability/availability.route';
import { bookingRouter } from './modules/booking/booking.route';
import { paymentRouter } from './modules/payment/payment.route';

const app: Application = express();

app.use(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/technician-profile", technicianProfileRouter);
app.use("/api/categories", categoryRouter)
app.use("/api/services", serviceRouter);
app.use("/api/availabilities", availabilityRouter)
app.use("/api/bookings", bookingRouter);
app.use("/api/payments", paymentRouter)

export default app;

