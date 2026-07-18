import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

// Public Routes
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getSingleCategory);

export const categoryRouter = router;
