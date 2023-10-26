import type { AppProps } from "next/app";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import Layout from "../components/Layout";
import { wagmiConfig, chains } from "wagmi-config";

type DappProviderProps = {
  children: React.ReactNode;
};

const DappProvider = ({ children }: DappProviderProps) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DappProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DappProvider>
  );
}

export default MyApp;
