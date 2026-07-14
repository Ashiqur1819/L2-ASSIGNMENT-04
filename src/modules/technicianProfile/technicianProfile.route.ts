import { Router } from "express";
import { TechnicianProfileController } from "./technicianProfile.controller";
import { Role } from "../../../generated/prisma/client";
import { auth } from "../../middlewares/auth";

const router = Router();

// Create Technician Profile
router.post(
  "/",
  auth(Role.TECHNICIAN),
  TechnicianProfileController.createTechnicianProfile,
);

// Update Technician Profile
router.patch(
  "/",
  auth(Role.TECHNICIAN),
  TechnicianProfileController.updateTechnicianProfile,
);

// Get Logged-in Technician Profile
router.get(
  "/me",
  auth(Role.TECHNICIAN),
  TechnicianProfileController.getMyProfile,
);

// Get Single Technician Profile (Public)
router.get("/:id", TechnicianProfileController.getSingleTechnician);

export const technicianProfileRouter = router;
