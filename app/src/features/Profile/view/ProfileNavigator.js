import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileView from './ProfileView';

const ProfileStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    ProfileMain: {
      screen: ProfileView,
    },
  },
});

export default ProfileStack;
