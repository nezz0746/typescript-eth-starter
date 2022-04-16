import { Connector } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ethers, providers } from "ethers";
import { env, supportedChains } from "./conf";

export const connectors = ({ chainId }: ConnectorsConfig) => {
  return [
    new InjectedConnector({
      chains: supportedChains.map((c) => c.chain),
      options: { shimDisconnect: true },
    }),
  ];
};

export const isChainSupported = (chainId?: number) =>
  supportedChains
    .map((c) => c.chain)
    .some((x) => x.id === chainId && chainId !== 31337);

type ProviderConfig = { chainId?: number; connector?: Connector };

type AlchemyProps = {
  network: string;
  apiKey: string;
};

const alchemyCredentials: Record<number, AlchemyProps> = {
  1: { network: "homtstead", apiKey: import.meta.env.ALCHEMY_MAINNET },
  80001: { network: "maticmum", apiKey: import.meta.env.ALCHEMY_MUMBAI },
};

export const provider = ({ chainId }: ProviderConfig) => {
  if (!chainId) return ethers.getDefaultProvider("homestead");
  if (chainId === 31337)
    return new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const unsupported = !supportedChains.map((c) => c.chain.id).includes(chainId);

  if (unsupported) {
    const { network, apiKey } = alchemyCredentials[1];
    return new ethers.providers.AlchemyProvider(network, apiKey);
  }

  const { network, apiKey } = alchemyCredentials[chainId];
  return new ethers.providers.AlchemyProvider(network, apiKey);
};

type ConnectorsConfig = { chainId?: number };

export const webSocketProvider = ({ chainId }: ConnectorsConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, env.INFURA)
    : undefined;
