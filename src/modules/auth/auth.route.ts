import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.get(
  "/me",
  auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  authController.getMe,
);

export const authRouter = router;
