import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import app from './app';

const reducer = {
  app,
};

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
