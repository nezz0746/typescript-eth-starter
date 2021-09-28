/* eslint-disable no-console */
import { BigNumber } from '@ethersproject/bignumber';
import { useEthers } from '@usedapp/core';
import { useCallback } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';
import useOwner from './useOwner';
import usePrice from './usePrice';

const useMint = (contract: MyNFT): { mintNFT: (tokenId: number) => Promise<void> } => {
  const { account } = useEthers();
  const { BNPrice } = usePrice(contract);
  const isOwner = useOwner(contract);

  const mintNFT = useCallback(
    async (tokenId: number) => {
      if (contract && account && BNPrice) {
        await (await contract.mint(account, tokenId, { value: isOwner ? BigNumber.from('0') : BNPrice })).wait();
      }
    },
    [BNPrice, account, contract, isOwner],
  );

  return { mintNFT };
};

export default useMint;
