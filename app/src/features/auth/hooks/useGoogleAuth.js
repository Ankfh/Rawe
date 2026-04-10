import { useCallback, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../../baseUrl/data/baseUrls';
import {
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { setSession } from '../services/authSlice';
import { saveAuthToken } from '../services/tokenStorage';
import { GOOGLE_WEB_CLIENT_ID } from '../services/googleConfig';

const configureGoogleSignin = () => {
  console.log('[AUTH][APP][GOOGLE] Configuring GoogleSignin.');
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: ['email', 'profile'],
  });
};

const useGoogleAuth = () => {
  const dispatch = useDispatch();
  const isConfigured = useRef(false);

  useEffect(() => {
    if (!isConfigured.current) {
      configureGoogleSignin();
      isConfigured.current = true;
      console.log('[AUTH][APP][GOOGLE] GoogleSignin configured successfully.');
    }
  }, []);

  const startGoogleLogin = useCallback(async () => {
    console.log('[AUTH][APP][GOOGLE] Login flow started from UI.');
    try {
      console.log('[AUTH][APP][GOOGLE] Checking Play Services.');
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      console.log('[AUTH][APP][GOOGLE] Play Services available. Opening Google sign-in UI.');
      const response = await GoogleSignin.signIn();
        console.log(response , 'response')
      if (!isSuccessResponse(response)) {
        console.log('[AUTH][APP][GOOGLE] Sign-in was cancelled or did not return success response.');
        return;
      }

      const idToken = response.data.idToken;
      console.log(idToken , 'idToken')
      console.log(
        `[AUTH][APP][GOOGLE] Google sign-in success for email=${response.data.user?.email || 'n/a'} idTokenPresent=${Boolean(idToken)}`
      );

      if (!idToken) {
        throw new Error('Google sign-in did not return an ID token.');
      }

      console.log('[AUTH][APP][GOOGLE] Exchanging Google idToken with backend.');

      const backendResponse = await fetch(`${BASE_URL}/api/auth/google/mobile`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idToken,
        }),
      });

      console.log(`[AUTH][APP][GOOGLE] Backend exchange response status=${backendResponse.status}`);

      if (!backendResponse.ok) {
        const errorJson = await backendResponse.json().catch(() => null);
        throw new Error(errorJson?.message || 'Google sign-in failed.');
      }

      const payload = await backendResponse.json();
      console.log(
        `[AUTH][APP][GOOGLE] Backend login success userId=${payload?.data?.user?.id || 'n/a'} email=${payload?.data?.user?.email || 'n/a'}`
      );

      await saveAuthToken(payload?.data?.token);
      console.log('[AUTH][APP][GOOGLE] Token saved to storage. Updating Redux session.');
      dispatch(setSession(payload?.data));
      console.log('[AUTH][APP][GOOGLE] Redux auth session updated successfully.');
    } catch (error) {
      console.error(`[AUTH][APP][GOOGLE] Login flow failed: ${error.message}`);
      Alert.alert('Login Failed', error.message || 'Unable to complete Google sign-in. Please try again.');
    }
  }, []);

  return {
    startGoogleLogin,
  };
};

export default useGoogleAuth;
