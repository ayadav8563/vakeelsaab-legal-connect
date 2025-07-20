import React from 'react';
import AppNavigator from './src/navigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/Store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
