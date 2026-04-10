import express from 'express';
import passport from 'passport';
import {
  getCurrentUserController,
  handleGoogleMobileLogin,
  handleGoogleAuthSuccess,
  logoutController,
} from '../controller/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const authRoutes = express.Router();

authRoutes.use((req, _res, next) => {
  console.log(`[AUTH][ROUTE] ${req.method} ${req.originalUrl}`);
  next();
});

authRoutes.get('/google', (req, res, next) => {
  const state = req.query.mobile === '1' ? 'mobile' : 'web';
  console.log(`[AUTH][ROUTE] Starting Google OAuth redirect flow. state=${state}`);

  return passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
    state,
  })(req, res, next);
});

authRoutes.post('/google/mobile', handleGoogleMobileLogin);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/auth/failure',
  }),
  handleGoogleAuthSuccess
);

authRoutes.get('/me', requireAuth, getCurrentUserController);
authRoutes.post('/logout', logoutController);

authRoutes.get('/failure', (_req, res) => {
  console.warn('[AUTH][ROUTE] Google OAuth failure endpoint reached.');
  return res.status(401).json({
    success: false,
    message: 'Google authentication failed.',
  });
});

export default authRoutes;
