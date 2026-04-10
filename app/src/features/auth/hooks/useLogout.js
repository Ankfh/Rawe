import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useLogoutMutation } from '../services/authApi';
import { clearSession } from '../services/authSlice';
import { clearAuthToken } from '../services/tokenStorage';

const useLogout = () => {
  const dispatch = useDispatch();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const logout = useCallback(async () => {
    console.log('[AUTH][APP][LOGOUT] Logout flow started.');
    try {
      console.log('[AUTH][APP][LOGOUT] Calling backend logout endpoint.');
      await logoutApi().unwrap();
      console.log('[AUTH][APP][LOGOUT] Backend logout success.');
    } catch (_error) {
      console.warn('[AUTH][APP][LOGOUT] Backend logout failed, continuing local cleanup.');
      // Even if backend logout fails, local auth state must be cleared.
    } finally {
      try {
        console.log('[AUTH][APP][LOGOUT] Signing out from native Google session.');
        await GoogleSignin.signOut();
        console.log('[AUTH][APP][LOGOUT] Native Google sign-out success.');
      } catch (_error) {
        console.warn('[AUTH][APP][LOGOUT] Native Google sign-out failed, continuing local cleanup.');
        // Ignore native sign-out failures and continue clearing local state.
      }

      await clearAuthToken();
      dispatch(clearSession());
      console.log('[AUTH][APP][LOGOUT] Local token/session cleared. Logout completed.');
    }
  }, [dispatch, logoutApi]);

  const confirmLogout = useCallback(() => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  }, [logout]);

  return {
    confirmLogout,
    isLoggingOut: isLoading,
  };
};

export default useLogout;
