import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import RoutesContainer from './src/navigation/services/RoutesContainer';

import { ThemeProvider } from './src/components/Theme/ThemeContext';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
          <RoutesContainer />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
