import UserModel from '../model/userModel.js';

export const findOrCreateGoogleUser = async profile => {
  const email = profile?.emails?.[0]?.value?.toLowerCase()?.trim();
  console.log(`[AUTH][USER] findOrCreateGoogleUser called. email=${email || 'missing'}`);

  if (!email) {
    console.warn('[AUTH][USER] Google profile did not include an email.');
    const error = new Error('Google account did not provide an email.');
    error.statusCode = 400;
    throw error;
  }

  const googleId = profile?.id || null;
  const avatar = profile?.photos?.[0]?.value || null;
  const displayName = profile?.displayName || email.split('@')[0];

  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    console.log('[AUTH][USER] No existing user found, creating new user.');
    return UserModel.create({
      googleId,
      name: displayName,
      email,
      avatar,
    });
  }

  console.log(`[AUTH][USER] Existing user found userId=${existingUser._id}, checking updates.`);

  let hasUpdates = false;

  if (googleId && existingUser.googleId !== googleId) {
    existingUser.googleId = googleId;
    hasUpdates = true;
  }

  if (avatar && existingUser.avatar !== avatar) {
    existingUser.avatar = avatar;
    hasUpdates = true;
  }

  if (displayName && existingUser.name !== displayName) {
    existingUser.name = displayName;
    hasUpdates = true;
  }

  if (hasUpdates) {
    console.log(`[AUTH][USER] Persisting user profile updates for userId=${existingUser._id}.`);
    await existingUser.save();
  }

  if (!hasUpdates) {
    console.log(`[AUTH][USER] No profile changes needed for userId=${existingUser._id}.`);
  }

  return existingUser;
};

export const findUserById = async userId => {
  console.log(`[AUTH][USER] findUserById called userId=${userId}`);
  return UserModel.findById(userId).lean();
};
