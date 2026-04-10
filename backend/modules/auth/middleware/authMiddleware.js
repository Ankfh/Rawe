import { verifyAuthToken } from '../services/jwtService.js';

const getTokenFromRequest = req => {
  const cookieToken = req.cookies?.authToken;

  if (cookieToken) {
    return cookieToken;
  }

  const authHeader = req.headers.authorization || '';

  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }

  return null;
};

export const requireAuth = (req, res, next) => {
  console.log(`[AUTH][MIDDLEWARE] requireAuth for ${req.method} ${req.originalUrl}`);
  const token = getTokenFromRequest(req);

  const tokenSource = req.cookies?.authToken
    ? 'cookie'
    : req.headers.authorization?.startsWith('Bearer ')
      ? 'bearer-header'
      : 'none';
  console.log(`[AUTH][MIDDLEWARE] tokenSource=${tokenSource} tokenPresent=${Boolean(token)}`);

  if (!token) {
    console.warn('[AUTH][MIDDLEWARE] Missing token, rejecting request.');
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: missing authentication token.',
    });
  }

  try {
    const decoded = verifyAuthToken(token);
    console.log(`[AUTH][MIDDLEWARE] JWT verified for userId=${decoded.sub} email=${decoded.email}`);
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };
    return next();
  } catch (error) {
    console.error(`[AUTH][MIDDLEWARE] JWT verification failed: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: invalid or expired token.',
    });
  }
};
