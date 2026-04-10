import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/AntDesign';
import AuthRoutes from '../routes/authRoutes';
import React from 'react';

const MainTabNavigator = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = AuthRoutes.find(r => r.name === route.name);
      const iconName = focused
        ? routeConfig?.activeIcon
        : routeConfig?.icon;
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#007AFF',
    tabBarInactiveTintColor: 'gray',
    headerShown: true,
  }),
  screens: AuthRoutes.reduce((acc, route) => {
    acc[route.name] = {
      screen: route.component,
      options: { title: route.name }
    };
    return acc;
  }, {}),
});

export default MainTabNavigator;
