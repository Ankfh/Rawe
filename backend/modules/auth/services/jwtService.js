import jwt from 'jsonwebtoken';

const DEFAULT_EXPIRES_IN = '7d';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || process.env.SESSION_SECRET;

  if (!secret) {
    console.error('[AUTH][JWT] Missing JWT secret in environment.');
    throw new Error('Missing JWT secret. Set JWT_SECRET or SESSION_SECRET in environment variables.');
  }

  return secret;
};

export const signAuthToken = user => {
  console.log(`[AUTH][JWT] Signing JWT for userId=${user?._id} email=${user?.email}`);
  return jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      name: user.name,
    },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN || DEFAULT_EXPIRES_IN,
    }
  );
};

export const verifyAuthToken = token => {
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    console.log(`[AUTH][JWT] JWT verified for userId=${decoded.sub}`);
    return decoded;
  } catch (error) {
    console.error(`[AUTH][JWT] JWT verification failed: ${error.message}`);
    throw error;
  }
};

export const getCookieOptions = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};
