import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { serviceController } from "./service.controller";

const router = Router();

/* Technician */

router.post(
  "/",
  auth(Role.TECHNICIAN),
  serviceController.createService,
);

// router.get(
//   "/my-services",
//   auth(Role.TECHNICIAN),
//   ServiceController.getMyServices,
// );

router.patch(
  "/:id",
  auth(Role.TECHNICIAN),
  serviceController.updateService,
);

// router.delete(
//   "/:id",
//   auth(Role.TECHNICIAN),
//   serviceController.deleteService,
// );

// /* Public */

// router.get("/", serviceController.getAllServices);

// router.get("/:id", serviceController.getSingleService);

export const serviceRouter = router;