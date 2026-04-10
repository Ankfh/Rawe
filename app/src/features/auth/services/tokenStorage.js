import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

export const saveAuthToken = async token => {
  console.log(`[AUTH][APP][STORAGE] saveAuthToken called tokenPresent=${Boolean(token)}`);
  if (!token) {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    console.log('[AUTH][APP][STORAGE] Token removed because input was empty.');
    return;
  }

  await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  console.log('[AUTH][APP][STORAGE] Token saved successfully.');
};

export const loadAuthToken = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  console.log(`[AUTH][APP][STORAGE] loadAuthToken completed tokenPresent=${Boolean(token)}`);
  return token;
};

export const clearAuthToken = async () => {
  console.log('[AUTH][APP][STORAGE] clearAuthToken called.');
  await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  console.log('[AUTH][APP][STORAGE] Token cleared successfully.');
};

export const authTokenKey = AUTH_TOKEN_KEY;
