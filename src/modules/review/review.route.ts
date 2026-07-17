import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { reviewController } from "./review.controller";

const router = Router();

// Get All Reviews
router.get("/", reviewController.getAllReviews);

// Get Reviews By Technician
router.get("/technician/:technicianId", reviewController.getTechnicianReviews);

// Get Single Review
router.get("/:id", reviewController.getSingleReview);

// Create Review
router.post("/", auth(Role.CUSTOMER), reviewController.createReview);

// Update Review
router.patch("/:id", auth(Role.CUSTOMER), reviewController.updateReview);

// Delete Review
router.delete("/:id", auth(Role.CUSTOMER), reviewController.deleteReview);

export const reviewRouter = router;
