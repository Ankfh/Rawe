import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import RoutesContainer from './src/navigation/services/RoutesContainer';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <RoutesContainer />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
