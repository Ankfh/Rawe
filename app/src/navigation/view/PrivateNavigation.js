import { createNativeStackNavigator } from '@react-navigation/native-stack';
import privateRoute from '../routes/privateRoute';

const PrivateNavigation = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: privateRoute.reduce((acc, route) => {
    acc[route.name] = {
      screen: route.component,
    };
    return acc;
  }, {}),
});

export default PrivateNavigation;
