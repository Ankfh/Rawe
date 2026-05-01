import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AuthRoutes from '../routes/authRoutes';
import React from 'react';
import { theme } from '../../components/Theme/ThemeContext';

const MainTabNavigator = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      const routeConfig = AuthRoutes.find(r => r.name === route.name);
      const iconName = focused ? routeConfig?.activeIcon : routeConfig?.icon;
      return <AntDesign name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: theme.colors.textAccent,
    tabBarInactiveTintColor: theme.colors.textSecondary,

    headerStyle: {
      backgroundColor: theme.colors.backgroundSecondary,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.glassBorder,
    },
    headerTintColor: theme.colors.textPrimary,
    headerTitleStyle: {
      fontWeight: '700',
      fontSize: 18,
    },
    sceneStyle: {
      backgroundColor: theme.colors.backgroundMain,
      paddingBottom: 100,
    },
    tabBarStyle: {
      position: 'absolute',
      bottom: 20,
      marginHorizontal: 16,
      elevation: 15,
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: 28,
      height: 70,
      borderWidth: 1.5,
      borderColor: theme.colors.glassBorder,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      paddingBottom: 8,
      paddingTop: 8,
    },
    tabBarLabelStyle: {
      fontSize: 11,
      fontWeight: '600',
      marginBottom: 4,
    },
  }),
  screens: AuthRoutes.reduce((acc, route) => {
    acc[route.name] = {
      screen: route.component,
      options: { title: route.name, headerShown: route?.headerShown },
      ...(route.if && { if: route.if }),
    };
    return acc;
  }, {}),
});

export default MainTabNavigator;
