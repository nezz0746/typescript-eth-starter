import { useEthers } from '@usedapp/core';

export const getNetworkCurrency = (chainID: number | undefined): string => {
  switch (chainID) {
    case 137:
      return 'MATIC';
    default:
      return 'ETH';
  }
};

const useCurrency = (): string => {
  const { chainId } = useEthers();

  return getNetworkCurrency(chainId);
};

export default useCurrency;
