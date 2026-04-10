const GOOGLE_TOKENINFO_URL = 'https://oauth2.googleapis.com/tokeninfo';

export const verifyGoogleIdToken = async idToken => {
  if (!idToken) {
    console.warn('[AUTH][GOOGLE-TOKEN] Missing idToken in verification request.');
    const error = new Error('Missing Google ID token.');
    error.statusCode = 400;
    throw error;
  }

  console.log(`[AUTH][GOOGLE-TOKEN] Verifying Google idToken length=${idToken.length}`);

  const response = await fetch(`${GOOGLE_TOKENINFO_URL}?id_token=${encodeURIComponent(idToken)}`);

  console.log(`[AUTH][GOOGLE-TOKEN] tokeninfo response status=${response.status}`);

  if (!response.ok) {
    console.warn('[AUTH][GOOGLE-TOKEN] tokeninfo rejected token as invalid.');
    const error = new Error('Invalid Google ID token.');
    error.statusCode = 401;
    throw error;
  }

  const tokenData = await response.json();
  const expectedAudience = process.env.GOOGLE_CLIENT_ID;
  console.log(`[AUTH][GOOGLE-TOKEN] tokeninfo payload sub=${tokenData.sub} aud=${tokenData.aud} email=${tokenData.email}`);

  if (expectedAudience && tokenData.aud !== expectedAudience) {
    console.warn(
      `[AUTH][GOOGLE-TOKEN] Audience mismatch expected=${expectedAudience} got=${tokenData.aud}`
    );
    const error = new Error('Google token audience mismatch.');
    error.statusCode = 401;
    throw error;
  }

  if (tokenData.email_verified !== 'true') {
    console.warn('[AUTH][GOOGLE-TOKEN] Google account email is not verified.');
    const error = new Error('Google email is not verified.');
    error.statusCode = 401;
    throw error;
  }

  console.log('[AUTH][GOOGLE-TOKEN] Google token verification passed.');

  return tokenData;
};