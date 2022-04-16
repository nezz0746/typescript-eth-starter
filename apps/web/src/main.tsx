import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as DappProvider } from "wagmi";
import "./index.css";
import App from "./App";
import {
  connectors,
  provider,
  webSocketProvider,
} from "./connectors/connectors";
import { ThemeProvider } from "./hooks/useTheme";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <DappProvider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </DappProvider>
  </React.StrictMode>
);
