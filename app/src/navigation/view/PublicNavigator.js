import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PublicRoutes from '../routes/publicRoutes';

const PublicNavigator = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: PublicRoutes.reduce((acc, route) => {
    acc[route.name] = {
      screen: route.component,
    };
    return acc;
  }, {}),
});

export default PublicNavigator;
