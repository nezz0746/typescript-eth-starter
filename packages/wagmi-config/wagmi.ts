import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig } from "wagmi";
import { baseGoerli, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { projectId, appName } from "shared-config";

let defaultChain: Chain;

if (process.env.NODE_ENV === "development") {
  defaultChain = localhost;
} else {
  defaultChain = baseGoerli;
}

const { chains, publicClient } = configureChains(
  [defaultChain],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName,
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { wagmiConfig, chains, defaultChain };
