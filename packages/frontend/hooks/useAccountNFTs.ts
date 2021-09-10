/* eslint-disable no-console */
/* eslint-disable no-async-promise-executor */
import { BigNumber } from '@ethersproject/bignumber';
import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';
import { Piece } from '../utils/helpers';

const getPiece: (tokenId: BigNumber, contract: MyNFT) => Promise<Partial<Piece>> = (
  tokenId,
  contract,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const uri = await contract.tokenURI(tokenId);

      const token: Partial<Piece> = {
        tokenURI: uri,
        tokenId: tokenId.toNumber(),
      };

      resolve(token);
    } catch (error) {
      reject({});
    }
  });
};

const useAccountNFTs = (
  contract: MyNFT,
): {
  nfts: Partial<Piece>[];
} => {
  const { account } = useEthers();
  const [nfts, setNfts] = useState<Partial<Piece>[]>([]);

  const getAccountNFTs = useCallback(async () => {
    try {
      if (account) {
        const wallet = await contract.walletOfOwner(account);

        const nftsRes: Partial<Piece>[] = await Promise.all(
          wallet.map((tokenId) => getPiece(tokenId, contract)),
        );

        setNfts(nftsRes);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  }, [account, contract]);

  useEffect(() => {
    getAccountNFTs();
  }, [getAccountNFTs]);

  return {
    nfts,
  };
};

export default useAccountNFTs;
