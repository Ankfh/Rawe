import { createNativeStackNavigator } from '@react-navigation/native-stack';
import adminRoutes from '../routes/adminRoutes';

const AdminNavigation = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: adminRoutes.reduce((acc, route) => {
    acc[route.name] = {
      screen: route.component,
    };
    return acc;
  }, {}),
});

export default AdminNavigation;
