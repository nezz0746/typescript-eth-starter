/* eslint-disable no-console */
import { BigNumber } from '@ethersproject/bignumber';
import { useCallback, useEffect, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';

const usePrice = (contract: MyNFT): { price: number; BNPrice: BigNumber | null } => {
  const [price, setPrice] = useState(0);
  const [BNPrice, setBNPrice] = useState<BigNumber | null>(null);

  const getPrice = useCallback(async () => {
    try {
      const newPrice = await contract._price();
      setBNPrice(newPrice);
      setPrice(parseInt(newPrice.toString()) / 10 ** 18);
    } catch (error) {
      console.log(`error`, error);
    }
  }, [contract]);

  useEffect(() => {
    getPrice();
  }, [getPrice]);

  return { price, BNPrice };
};

export default usePrice;
