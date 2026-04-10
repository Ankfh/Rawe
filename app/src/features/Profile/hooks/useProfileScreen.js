import { useSelector } from 'react-redux';
import useLogout from '../../auth/hooks/useLogout';
import { selectProfileViewModel } from '../services/profileSelectors';

const useProfileScreen = () => {
  const profile = useSelector(selectProfileViewModel);
  const { confirmLogout, isLoggingOut } = useLogout();

  return {
    profile,
    confirmLogout,
    isLoggingOut,
  };
};

export default useProfileScreen;
