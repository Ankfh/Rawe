import express from "express";
import { requireAuth } from "../../auth/middleware/authMiddleware.js";
import { isAdminMiddleware } from "../middleware/isAdminMiddleware.js";
import { getSettingsController } from "../controller/getSettingsController.js";
import { updateSettingsController } from "../controller/updateSettingsController.js";

const router = express.Router();

/**
 * Admin Settings Routes
 */

// GET /api/admin/settings
router.get("/settings", requireAuth, isAdminMiddleware, getSettingsController);

// PUT /api/admin/settings
router.put(
  "/settings",
  requireAuth,
  isAdminMiddleware,
  updateSettingsController,
);

export default router;
