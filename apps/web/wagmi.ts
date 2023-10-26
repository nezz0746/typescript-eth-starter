import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WALLETCONNECT_PROJECT_ID, appName } from "./constants";

const { chains, publicClient } = configureChains(
  [localhost],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName,
  projectId: WALLETCONNECT_PROJECT_ID,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains };
