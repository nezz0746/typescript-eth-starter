import { ChainId, Config, MULTICALL_ADDRESSES } from '@usedapp/core';
import {
  GreeterContractAddress as LocalhostGreeterContractAddress,
  MulticallContractAddress as LocalhostMulticallContractAddress,
  MyNFTContractAddress as LocalhostMyNFTContractAddress,
} from '../artifacts/contracts/addresses/localhostContractAddress';
import {
  GreeterContractAddress as RinkebyGreeterContractAddress,
  MulticallContractAddress as RinkebyMulticallContractAddress,
  MyNFTContractAddress as RinberkyMyNFTContractAddress,
} from '../artifacts/contracts/addresses/rinkebyContractAddress';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

export const devChains: ChainId[] = [ChainId.Localhost];

export const allowedChains: ChainId[] = [ChainId.Localhost, ChainId.Rinkeby].filter((chaindId) => {
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
    [ChainId.Localhost]: contractConfig[chainId].multicall,
  },
});

const contractConfig: Record<number, { greeter?: string; multicall: string; myNft?: string }> = {
  [ChainId.Localhost]: {
    greeter: LocalhostGreeterContractAddress,
    multicall: LocalhostMulticallContractAddress,
    myNft: LocalhostMyNFTContractAddress,
  },
  [ChainId.Rinkeby]: {
    greeter: RinkebyGreeterContractAddress,
    multicall: RinkebyMulticallContractAddress,
    myNft: RinberkyMyNFTContractAddress,
  },
};

export default contractConfig;
