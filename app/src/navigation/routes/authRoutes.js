import HomeNavigator from '../../features/Home/view/HomeNavigator';
import AboutView from "../../features/About/view/AboutView";
import ProfileNavigator from '../../features/Profile/view/ProfileNavigator';

const AuthRoutes = [
  {
    name: "Home",
    component: HomeNavigator,
    icon: "home",
    activeIcon: "home",
  },
  {
    name: "About",
    component: AboutView,
    icon: "infocirlceo",
    activeIcon: "infocirlce",
  },
  {
    name: 'Profile',
    component: ProfileNavigator,
    icon: 'user',
    activeIcon: 'user',
  },
];

export default AuthRoutes;
