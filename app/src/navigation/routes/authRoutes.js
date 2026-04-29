import HomeNavigator from '../../features/Home/view/HomeNavigator';
import AboutView from '../../features/About/view/AboutView';
import ProfileNavigator from '../../features/Profile/view/ProfileNavigator';

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
];

export default AuthRoutes;
