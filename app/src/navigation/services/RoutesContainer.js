import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import AppNavigator from '../view/AppNavigator';
import useAuthBootstrap from '../../features/auth/hooks/useAuthBootstrap';
import BootSplash from 'react-native-bootsplash';

const RoutesContainer = () => {
  useAuthBootstrap();
  const { authLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authLoading) {
      BootSplash.hide({ fade: true });
    }
  }, [authLoading]);

  if (authLoading) {
    return <View style={{ flex: 1, backgroundColor: '#0F172A' }} />;
  }

  return <AppNavigator />;
};

export default RoutesContainer;
