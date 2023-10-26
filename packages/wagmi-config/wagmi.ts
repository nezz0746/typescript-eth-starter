import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { projectId, appName } from "shared-config";

const { chains, publicClient } = configureChains(
  [localhost],
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

export { wagmiConfig, chains };
