import HomeNavigator from '../../features/Home/view/HomeNavigator';
import AboutView from '../../features/About/view/AboutView';
import ProfileNavigator from '../../features/Profile/view/ProfileNavigator';
import AdminSettingView from '../../components/adminSettings/view/AdminSettingView';
import { useIsAdmin } from '../hooks/useAuth';

const AuthRoutes = [
  {
    name: 'Home',
    component: HomeNavigator,
    icon: 'home',
    activeIcon: 'home',
    headerShown: false,
  },
  {
    name: 'About',
    component: AboutView,
    icon: 'infocirlceo',
    activeIcon: 'infocirlce',
    headerShown: true,
  },
  {
    name: 'Profile',
    component: ProfileNavigator,
    icon: 'user',
    activeIcon: 'user',
    headerShown: true,
  },
  {
    name: 'Admin',
    component: AdminSettingView,
    icon: 'setting',
    activeIcon: 'setting',
    headerShown: true,
    if: useIsAdmin,
  },
];

export default AuthRoutes;
