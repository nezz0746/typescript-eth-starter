import { ChainId, Config, MULTICALL_ADDRESSES } from '@usedapp/core';
import {
  GreeterContractAddress as LocalhostGreeterContractAddress,
  MulticallContractAddress as LocalhostMulticallContractAddress,
} from '../artifacts/contracts/addresses/localhostContractAddress';
import {
  GreeterContractAddress as RinkebyGreeterContractAddress,
  MulticallContractAddress as RinkebyMulticallContractAddress,
} from '../artifacts/contracts/addresses/rinkebyContractAddress';

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

export const allowedChains: ChainId[] = [ChainId.Localhost, ChainId.Rinkeby];

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
    [ChainId.Hardhat]: contractConfig[chainId].multicall,
    [ChainId.Localhost]: contractConfig[chainId].multicall,
  },
});

const contractConfig: Record<number, { greeter: string; multicall: string }> = {
  [ChainId.Localhost]: {
    greeter: LocalhostGreeterContractAddress,
    multicall: LocalhostMulticallContractAddress,
  },
  [ChainId.Rinkeby]: {
    greeter: RinkebyGreeterContractAddress,
    multicall: RinkebyMulticallContractAddress,
  },
};

export default contractConfig;
