import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './HomeView';

const HomeStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    HomeMain: {
      screen: HomeView,
    },
  },
});

export default HomeStack;
