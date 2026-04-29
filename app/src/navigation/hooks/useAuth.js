import { useSelector } from 'react-redux';

const useAuth = () => {
  const { isLogin, userData, authLoading, accessToken } = useSelector(
    state => state.auth,
  );

  return { isLogin, userData, authLoading, accessToken };
};

export const useIsLoggedIn = () => {
  const { isLogin } = useAuth();
  return isLogin;
};

export const useIsLoggedOut = () => {
  const { isLogin } = useAuth();
  return !isLogin;
};

export const useIsAdmin = () => {
  const { userData } = useAuth();
  return userData?.is_admin;
};

export default useAuth;
