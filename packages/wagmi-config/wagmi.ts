import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig } from "wagmi";
import { base, goerli, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  projectId,
  appName,
  localChainEnabled,
  testnetChainEnabled,
  mainnetChainEnabled,
} from "shared-config";

let defaultChain: Chain;
let appChains: Chain[] = [];

if (localChainEnabled) {
  defaultChain = localhost;
  appChains = [localhost];
}

if (testnetChainEnabled) {
  defaultChain = goerli;
  appChains = [goerli];
}

if (mainnetChainEnabled) {
  defaultChain = base;
  appChains = [base];
}

console.log({ appChains });

const { chains, publicClient } = configureChains(appChains, [publicProvider()]);

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
