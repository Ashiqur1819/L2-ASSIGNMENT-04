import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { ServiceController } from "./service.controller";

const router = Router();

/* Technician */

router.post(
  "/",
  auth(Role.TECHNICIAN),
  ServiceController.createService,
);

// router.get(
//   "/my-services",
//   auth(Role.TECHNICIAN),
//   ServiceController.getMyServices,
// );

// router.patch(
//   "/:id",
//   auth(Role.TECHNICIAN),
//   ServiceController.updateService,
// );

// router.delete(
//   "/:id",
//   auth(Role.TECHNICIAN),
//   ServiceController.deleteService,
// );

// /* Public */

// router.get("/", ServiceController.getAllServices);

// router.get("/:id", ServiceController.getSingleService);

export const serviceRouter = router;