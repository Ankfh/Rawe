import { checkIsAdmin } from '../../auth/services/adminService.js';

/**
 * Middleware to check if the authenticated user has admin privileges.
 */
export const isAdminMiddleware = (req, res, next) => {
  if (!req.user || !checkIsAdmin(req.user.email)) {
    console.warn(`[ADMIN][AUTH] Unauthorized access attempt by user: ${req.user?.email || 'unknown'}`);
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Admin access required.',
    });
  }
  next();
};
