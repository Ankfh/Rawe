import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './HomeView';
import UploadView from '../../Upload/view/UploadView';

const HomeStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    HomeMain: {
      screen: HomeView,
    },
    UploadBook: {
      screen: UploadView,
    },
  },
});

export default HomeStack;
