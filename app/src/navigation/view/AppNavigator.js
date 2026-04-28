import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { useIsLoggedIn, useIsLoggedOut } from '../hooks/useAuth';
import MainTabNavigator from './MainTabNavigator';
import PublicNavigator from './PublicNavigator';
import ReaderQAScreen from '../../features/QA/view/ReaderQAScreen';

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
    ReaderQA: {
      screen: ReaderQAScreen,
    },
  },
});

const AppNavigator = createStaticNavigation(RootStack);

export default AppNavigator;
