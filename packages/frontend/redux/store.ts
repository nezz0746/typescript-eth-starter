import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';

import app from './app';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['app.ceramic'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers({ app }));

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 'app/setCeramic'],
        ignoredPaths: ['app.ceramic'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const persistor = persistStore(store);

export { store, persistor };
