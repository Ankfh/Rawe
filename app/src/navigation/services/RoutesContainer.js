import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import AppNavigator from '../view/AppNavigator';
import useAuthBootstrap from '../../features/auth/hooks/useAuthBootstrap';

const RoutesContainer = () => {
  useAuthBootstrap();
  const { authLoading } = useSelector((state) => state.auth);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <AppNavigator />;
};

export default RoutesContainer;
