import HomeNavigator from '../../features/Home/view/HomeNavigator';
import AboutView from '../../features/About/view/AboutView';
import ProfileNavigator from '../../features/Profile/view/ProfileNavigator';
import AdminSettingView from '../../components/adminSettings/view/AdminSettingView';
import { useIsAdmin } from '../hooks/useAuth';
import AdminView from '../../features/admin/view/AdminView';

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
    component: AdminView,
    icon: 'setting',
    activeIcon: 'setting',
    headerShown: true,
    isAdmin: useIsAdmin,
  },
];

export default AuthRoutes;
