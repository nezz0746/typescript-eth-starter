import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  Chain,
  ChainProviderFn,
  configureChains,
  createConfig,
  sepolia,
} from "wagmi";
import { base, localhost } from "wagmi/chains";
import {
  projectId,
  appName,
  localChainEnabled,
  testnetChainEnabled,
  mainnetChainEnabled,
  alchemy_key,
} from "shared-config";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

let defaultChain: Chain;
let appChains: Chain[] = [];
let providers: ChainProviderFn<Chain>[] = [];

if (mainnetChainEnabled) {
  defaultChain = base;
  appChains = [base];
}

if (testnetChainEnabled) {
  defaultChain = sepolia;
  appChains.push(sepolia);
}

if (testnetChainEnabled || mainnetChainEnabled) {
  providers.push(alchemyProvider({ apiKey: alchemy_key }));
}

if (localChainEnabled) {
  defaultChain = localhost;
  appChains.push(localhost);
  providers.push(
    jsonRpcProvider({ rpc: () => ({ http: "http://localhost:8545" }) })
  );
}
console.log({ appChains });
console.log({ providers });

const { chains, publicClient } = configureChains(appChains, providers);

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
