import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { subgraphAPI } from "./subgraph";
import { Provider } from "react-redux";
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [subgraphAPI.reducerPath]: subgraphAPI.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(subgraphAPI.middleware),
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
