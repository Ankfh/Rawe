import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetCurrentUserQuery } from '../services/authApi';
import { clearSession, setAuthLoading, setSession, setToken } from '../services/authSlice';
import { clearAuthToken, loadAuthToken } from '../services/tokenStorage';

const useAuthBootstrap = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const [fetchCurrentUser] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      console.log('[AUTH][APP][BOOTSTRAP] Bootstrap started.');
      dispatch(setAuthLoading(true));

      try {
        const storedToken = await loadAuthToken();

        if (!isMounted) {
          console.log('[AUTH][APP][BOOTSTRAP] Component unmounted during bootstrap.');
          return;
        }

        if (!storedToken) {
          console.log('[AUTH][APP][BOOTSTRAP] No stored token found. Clearing session.');
          dispatch(clearSession());
          return;
        }

        console.log('[AUTH][APP][BOOTSTRAP] Stored token found. Setting token in Redux.');
        dispatch(setToken(storedToken));

        console.log('[AUTH][APP][BOOTSTRAP] Calling /me to hydrate user session.');
        const response = await fetchCurrentUser().unwrap();

        if (!isMounted) {
          console.log('[AUTH][APP][BOOTSTRAP] Component unmounted after /me call.');
          return;
        }

        console.log(
          `[AUTH][APP][BOOTSTRAP] /me success userId=${response?.data?.user?.id || 'n/a'} email=${response?.data?.user?.email || 'n/a'}`
        );
        dispatch(
          setSession({
            token: storedToken,
            user: response?.data?.user,
          })
        );
      } catch (error) {
        console.error(`[AUTH][APP][BOOTSTRAP] Bootstrap failed: ${error?.message || 'unknown error'}`);
        await clearAuthToken();

        if (isMounted) {
          console.log('[AUTH][APP][BOOTSTRAP] Cleared token and session after bootstrap failure.');
          dispatch(clearSession());
        }
      } finally {
        if (isMounted) {
          console.log('[AUTH][APP][BOOTSTRAP] Bootstrap finished. authLoading=false');
          dispatch(setAuthLoading(false));
        }
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
    };
  }, [dispatch, fetchCurrentUser]);

  return {
    hasToken: Boolean(accessToken),
  };
};

export default useAuthBootstrap;
