/* eslint-disable no-console */
/* eslint-disable no-async-promise-executor */
import { BigNumber } from '@ethersproject/bignumber';
import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';
import { Piece } from '../types';

const getPiece: (tokenId: BigNumber, contract: MyNFT) => Promise<Partial<Piece>> = (
  tokenId,
  contract,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const uri = await contract.tokenURI(tokenId);

      const metadata = await fetch(uri).then((res) => res.json());

      const token: Partial<Piece> = {
        tokenURI: uri,
        tokenId: tokenId.toNumber(),
        metadata,
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
  refetch: () => Promise<void>;
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
    refetch: getAccountNFTs,
  };
};

export default useAccountNFTs;
