import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { categoryController } from "./category.controller";

const router = Router();

// Public Routes
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);

// Admin Routes
router.post(
  "/",
  auth(Role.ADMIN),
  categoryController.createCategory,
);

// router.patch(
//   "/:id",
//   auth(Role.ADMIN),
//   categoryController.updateCategory,
// );

// router.delete(
//   "/:id",
//   auth(Role.ADMIN),
//   categoryController.deleteCategory,
// );

export const categoryRouter = router;