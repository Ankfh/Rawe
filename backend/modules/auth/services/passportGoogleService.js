import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { findOrCreateGoogleUser, findUserById } from './userAuthService.js';

const getCallbackUrl = () => {
  return process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback';
};

export const configurePassportGoogle = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = getCallbackUrl();

  if (!clientId || !clientSecret) {
    console.warn('[AUTH] Google OAuth credentials are missing. Google login routes will not work until configured.');
    return;
  }

  console.log(`[AUTH][PASSPORT] Configuring Google strategy. callbackURL=${callbackURL}`);

  passport.use(
    new GoogleStrategy(
      {
        clientID: clientId,
        clientSecret,
        callbackURL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          console.log(
            `[AUTH][PASSPORT] Strategy callback received profile id=${profile?.id} email=${profile?.emails?.[0]?.value || 'n/a'}`
          );
          const user = await findOrCreateGoogleUser(profile);
          console.log(`[AUTH][PASSPORT] Strategy resolved user userId=${user._id}`);
          return done(null, user);
        } catch (error) {
          console.error(`[AUTH][PASSPORT] Strategy callback failed: ${error.message}`);
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    console.log(`[AUTH][PASSPORT] serializeUser userId=${user._id}`);
    done(null, String(user._id));
  });

  passport.deserializeUser(async (id, done) => {
    try {
      console.log(`[AUTH][PASSPORT] deserializeUser userId=${id}`);
      const user = await findUserById(id);
      done(null, user || null);
    } catch (error) {
      console.error(`[AUTH][PASSPORT] deserializeUser failed: ${error.message}`);
      done(error, null);
    }
  });
};
