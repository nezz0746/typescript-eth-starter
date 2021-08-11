import { useEthers } from '@usedapp/core';
import { Contract, ethers } from 'ethers';
import { useMemo } from 'react';

export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
): T | null {
  const { library } = useEthers();

  return useMemo(() => {
    if (!library) return null;
    if (!address) return null;

    return new ethers.Contract(address, ABI, library.getSigner()) as T;
  }, [ABI, address, library]);
}
