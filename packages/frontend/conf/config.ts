import { ChainId, Config, MULTICALL_ADDRESSES } from '@usedapp/core';
import {
  GreeterContractAddress as LocalhostGreeterContractAddress,
  MulticallContractAddress as LocalhostMulticallContractAddress,
  MyNFTContractAddress as LocalhostMyNFTContractAddress,
  MutableNFTContractAddress as LocalhostMutableNFTContractAddress,
} from '../artifacts/contracts/addresses/localhostContractAddress';
import {
  GreeterContractAddress as RinkebyGreeterContractAddress,
  MulticallContractAddress as RinkebyMulticallContractAddress,
  MyNFTContractAddress as RinberkyMyNFTContractAddress,
} from '../artifacts/contracts/addresses/rinkebyContractAddress';
import {
  GreeterContractAddress as PolygonGreeterContractAddress,
  MulticallContractAddress as PolygonMulticallContractAddress,
  MyNFTContractAddress as PolygonMyNFTContractAddress,
} from '../artifacts/contracts/addresses/maticContractAddress';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const ALCHEMY_KEY_MATIC = process.env.NEXT_PUBLIC_ALCHEMY_KEY_MATIC;

export const devChains: ChainId[] = [ChainId.Localhost];

export const allowedChains: ChainId[] = [
  ChainId.Hardhat,
  ChainId.Localhost,
  ChainId.Rinkeby,
  ChainId.Polygon,
].filter((chaindId) => {
  if (process.env.NODE_ENV === 'production') {
    return !devChains.includes(chaindId);
  }
  return chaindId;
});

export const getDappConfig = (chainId: number): Config => ({
  readOnlyUrls: {
    [ChainId.Rinkeby]: `https://ropsten.infura.io/v3/${INFURA_ID}`,
    [ChainId.Hardhat]: 'http://localhost:8545',
    [ChainId.Localhost]: 'http://localhost:8545',
    [ChainId.Polygon]: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY_MATIC}`,
  },
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Goerli,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.xDai,
    ChainId.Localhost,
    ChainId.Hardhat,
    ChainId.Polygon,
  ],
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    [ChainId.Rinkeby]: contractConfig[chainId].multicall,
    [ChainId.Hardhat]: contractConfig[chainId].multicall,
    [ChainId.Localhost]: contractConfig[chainId].multicall,
    [ChainId.Polygon]: contractConfig[chainId].multicall,
  },
});

const contractConfig: Record<
  number,
  { greeter?: string; multicall: string; myNft?: string; mutableNft?: string }
> = {
  [ChainId.Localhost]: {
    greeter: LocalhostGreeterContractAddress,
    multicall: LocalhostMulticallContractAddress,
    myNft: LocalhostMyNFTContractAddress,
    mutableNft: LocalhostMutableNFTContractAddress,
  },
  [ChainId.Hardhat]: {
    greeter: LocalhostGreeterContractAddress,
    multicall: LocalhostMulticallContractAddress,
    myNft: LocalhostMyNFTContractAddress,
    mutableNft: LocalhostMutableNFTContractAddress,
  },
  [ChainId.Rinkeby]: {
    greeter: RinkebyGreeterContractAddress,
    multicall: RinkebyMulticallContractAddress,
    myNft: RinberkyMyNFTContractAddress,
  },
  [ChainId.Polygon]: {
    greeter: PolygonGreeterContractAddress,
    multicall: PolygonMulticallContractAddress,
    myNft: PolygonMyNFTContractAddress,
  },
};

export default contractConfig;
