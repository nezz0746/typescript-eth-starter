import { Alchemy, Network } from "alchemy-sdk";
import { alchemy_key } from "./variables";

export const chainIdToOpenseaAssetUrl: Record<number, string> = {
  1: "https://opensea.io/assets/ethereum",
  5: "https://testnets.opensea.io/assets/goerli",
  11155111: "https://testnets.opensea.io/assets/sepolia",
  10: "https://opensea.io/assets/optimism",
  420: "https://opensea.io/assets/optimism-goerli",
  137: "https://opensea.io/assets/matic",
  80001: "https://testnets.opensea.io/assets/mumbai",
};

const chainIdToNetwork: Record<number, Network> = {
  1: Network.ETH_MAINNET,
  5: Network.ETH_GOERLI,
  10: Network.OPT_MAINNET,
  420: Network.OPT_GOERLI,
  137: Network.MATIC_MAINNET,
  80001: Network.MATIC_MUMBAI,
  8453: Network.BASE_MAINNET,
};

export const getAlchemyNFT = (chainId: number) => {
  return new Alchemy({
    apiKey: alchemy_key,
    network: chainIdToNetwork[chainId],
  }).nft;
};
