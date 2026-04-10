import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { useIsLoggedIn, useIsLoggedOut } from '../hooks/useAuth';
import MainTabNavigator from './MainTabNavigator';
import PublicNavigator from './PublicNavigator';

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
  },
});

const AppNavigator = createStaticNavigation(RootStack);

export default AppNavigator;
