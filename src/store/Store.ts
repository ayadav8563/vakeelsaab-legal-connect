import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import rootReducer from './Slices';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['chatReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor: Persistor = persistStore(store);
