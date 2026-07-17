import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

// Customer
router.post("/", auth(Role.CUSTOMER), bookingController.createBooking);

router.get("/", auth(Role.CUSTOMER), bookingController.getMyBookings);

// Technician
router.get(
  "/technician",
  auth(Role.TECHNICIAN),
  bookingController.getTechnicianBookings,
);

// Common
router.get(
  "/:id",
  auth(Role.CUSTOMER, Role.TECHNICIAN),
  bookingController.getSingleBooking,
);

router.patch(
  "/:id/status",
  auth(Role.TECHNICIAN),
  bookingController.updateBookingStatus,
);

router.patch(
  "/:id/cancel",
  auth(Role.CUSTOMER),
  bookingController.cancelBooking,
);

export const bookingRouter = router;
