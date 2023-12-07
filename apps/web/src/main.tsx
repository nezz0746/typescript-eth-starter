import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import Layout from "./components/Layout.tsx";
import { AppProvider } from "web-kit";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "wagmi-config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <AppProvider>
          <Layout>
            {/* TOFIX - DAISYUI BUG: missing/overriden classes */}
            <div className="hidden loading-bars loading-xs" />
            <App />
          </Layout>
        </AppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
