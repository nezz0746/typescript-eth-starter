import { chain } from "wagmi";

import deployments from "deployments";

export const supportedChains = [
  { chain: chain.hardhat, deployment: deployments.local },
  { chain: chain.polygonTestnetMumbai, deployment: deployments.mumbai },
];

export const env = {
  ETHERSCAN: import.meta.env.VITE_ETHERSCAN_APIKEY,
  ALCHEMY_MAINNET: import.meta.env.VITE_ALCHEMY_MAINNET,
  ALCHEMY_MUMBAI: import.meta.env.VITE_ALCHEMY_MUMBAI,
  INFURA: import.meta.env.VITE_INFURA,
};
