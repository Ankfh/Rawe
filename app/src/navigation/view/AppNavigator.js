import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { useIsAdmin, useIsLoggedIn, useIsLoggedOut } from '../hooks/useAuth';
import MainTabNavigator from './MainTabNavigator';
import PublicNavigator from './PublicNavigator';
import AdminNavigation from './AdminNavigation';
import PrivateNavigation from './PrivateNavigation';

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    authScreen: {
      screen: MainTabNavigator,
      if: useIsLoggedIn,
    },
    publicScreen: {
      screen: PublicNavigator,
      if: useIsLoggedOut,
    },
    privateScreen: {
      screen: PrivateNavigation,
      if: useIsLoggedIn,
    },

    adminScreen: {
      screen: AdminNavigation,
      if: useIsAdmin,
    },
  },
});

const AppNavigator = createStaticNavigation(RootStack);

export default AppNavigator;
