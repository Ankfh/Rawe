import { findUserById } from '../services/userAuthService.js';
import { getCookieOptions, signAuthToken } from '../services/jwtService.js';
import { verifyGoogleIdToken } from '../services/googleTokenVerificationService.js';
import { findOrCreateGoogleUser } from '../services/userAuthService.js';

const getMobileRedirectUrl = () => {
  return process.env.MOBILE_AUTH_SUCCESS_URL || 'aibookreader://auth-success';
};

const buildMobileRedirectWithPayload = ({ token, user }) => {
  const query = new URLSearchParams({
    token,
    id: String(user._id),
    name: user.name || '',
    email: user.email || '',
    avatar: user.avatar || '',
  });

  return `${getMobileRedirectUrl()}?${query.toString()}`;
};

export const handleGoogleAuthSuccess = (req, res) => {
  console.log('[AUTH][WEB-CALLBACK] Google callback reached.');

  if (!req.user) {
    console.warn('[AUTH][WEB-CALLBACK] Missing req.user after Passport callback.');
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
    });
  }

  console.log(`[AUTH][WEB-CALLBACK] User authenticated: userId=${req.user._id} email=${req.user.email}`);
  const token = signAuthToken(req.user);
  console.log(`[AUTH][WEB-CALLBACK] JWT issued for userId=${req.user._id}`);

  res.cookie('authToken', token, getCookieOptions());
  console.log('[AUTH][WEB-CALLBACK] authToken cookie set.');

  const isMobileFlow = req.query.state === 'mobile';
  console.log(`[AUTH][WEB-CALLBACK] state=${req.query.state || 'none'} isMobileFlow=${isMobileFlow}`);

  if (isMobileFlow) {
    console.log('[AUTH][WEB-CALLBACK] Redirecting to mobile deep link success URL.');
    return res.redirect(buildMobileRedirectWithPayload({ token, user: req.user }));
  }

  return res.status(200).json({
    success: true,
    message: 'Logged in successfully.',
    data: {
      token,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
      },
    },
  });
};

export const handleGoogleMobileLogin = async (req, res) => {
  try {
    console.log('[AUTH][MOBILE] Mobile login request received.');
    const { idToken } = req.body || {};
    console.log(`[AUTH][MOBILE] idToken present=${Boolean(idToken)} length=${idToken?.length || 0}`);
    const tokenData = await verifyGoogleIdToken(idToken);
    console.log(`[AUTH][MOBILE] Google token verified for sub=${tokenData.sub} email=${tokenData.email}`);

    const user = await findOrCreateGoogleUser({
      id: tokenData.sub,
      displayName: tokenData.name || tokenData.email?.split('@')?.[0] || 'Google User',
      emails: [{ value: tokenData.email }],
      photos: tokenData.picture ? [{ value: tokenData.picture }] : [],
    });
    console.log(`[AUTH][MOBILE] User resolved: userId=${user._id} email=${user.email}`);

    const token = signAuthToken(user);
    console.log(`[AUTH][MOBILE] App JWT generated for userId=${user._id}`);

    res.cookie('authToken', token, getCookieOptions());
    console.log('[AUTH][MOBILE] authToken cookie set.');

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      data: {
        token,
        user: {
          id: String(user._id),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error(
      `[AUTH][MOBILE] Login failed: message=${error.message} statusCode=${error.statusCode || 500}`
    );
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Google mobile login failed.',
    });
  }
};

export const getCurrentUserController = async (req, res) => {
  try {
    console.log(`[AUTH][ME] /me requested by userId=${req.user?.id || 'unknown'}`);
    const user = await findUserById(req.user.id);

    if (!user) {
      console.warn(`[AUTH][ME] User not found for userId=${req.user.id}`);
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    console.log(`[AUTH][ME] User fetched successfully userId=${user._id} email=${user.email}`);

    return res.status(200).json({
      success: true,
      message: 'User fetched successfully.',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    console.error(`[AUTH][ME] Failed to fetch current user: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch authenticated user.',
    });
  }
};

export const logoutController = (req, res) => {
  console.log(
    `[AUTH][LOGOUT] Logout requested by userId=${req.user?.id || 'unknown'} hasCookie=${Boolean(req.cookies?.authToken)}`
  );
  res.clearCookie('authToken', getCookieOptions());
  console.log('[AUTH][LOGOUT] authToken cookie cleared.');

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
};
