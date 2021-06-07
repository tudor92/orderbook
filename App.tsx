import React from 'react';
import type { ReactNode } from 'react';

import {
  SafeAreaView
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './Store/store';
import Dashboard from './Screens/Dashboard';

const App: () => ReactNode = () => {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </SafeAreaView>
  );
};
export default App;
