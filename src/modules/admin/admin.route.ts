import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { adminController } from "./admin.controller";

const router = Router();

/* ===========================
   Dashboard
=========================== */

// router.get(
//   "/dashboard",
//   auth(Role.ADMIN),
//   adminController.getDashboardStats,
// );

/* ===========================
   User Management
=========================== */

// Get All Users
router.get(
  "/users",
  auth(Role.ADMIN),
  adminController.getAllUsers,
);

// Active / Block User
router.patch(
  "/users/:id",
  auth(Role.ADMIN),
  adminController.updateUserStatus,
);

/* ===========================
   Booking Management
=========================== */

// Get All Bookings
router.get(
  "/bookings",
  auth(Role.ADMIN),
  adminController.getAllBookings,
);

/* ===========================
   Category Management
=========================== */

// Get All Categories
router.get(
  "/categories",
  auth(Role.ADMIN),
  adminController.getAllCategories,
);

// Create Category
router.post(
  "/categories",
  auth(Role.ADMIN),
  adminController.createCategory,
);

// Update Category
router.patch(
  "/categories/:id",
  auth(Role.ADMIN),
  adminController.updateCategory,
);

// Delete Category
// router.delete(
//   "/categories/:id",
//   auth(Role.ADMIN),
//   adminController.deleteCategory,
// );

/* ===========================
   Service Management
=========================== */

// Delete Service
// router.delete(
//   "/services/:id",
//   auth(Role.ADMIN),
//   adminController.deleteService,
// );

export const adminRouter = router;