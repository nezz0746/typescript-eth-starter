/* eslint-disable no-console */
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { useEthers } from '@usedapp/core';
import { BigNumber, ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { MutableNFT } from '../../hardhat/types/MutableNFT';

import { erc721Schema } from '../conf/ceramic';
import { useTypedSelector } from '../redux/store';
import { getMetadata, updateRegistry } from '../services/metadatamanage';
import { makeNewWordImage } from '../services/wordmaker';
import useSelfID from './useSelfID';

const useMintMutable = (
  contract: MutableNFT | null,
): {
  mintNFT: () => Promise<void>;
  minting: boolean;
  balance: number[];
  fetchTokenMetadata: (tokenID: number) => Promise<Record<string, string> | undefined>;
} => {
  const [minting, setMinting] = useState(false);
  const { self } = useSelfID();
  const { account } = useEthers();
  const { ceramic } = useTypedSelector((state) => state.app);
  const [balance, setBalance] = useState<number[]>([]);

  const fetchTokenMetadata = useCallback(
    async (tokenID: number) => {
      if (contract) {
        const uri = await contract.tokenURI(ethers.BigNumber.from(tokenID));

        const data = await getMetadata(uri);

        return data;
      }
    },
    [contract],
  );

  const getBalance = useCallback(async () => {
    if (account && contract) {
      const bal = await contract.walletOfOwner(account);

      setBalance(bal.map((bn: BigNumber) => bn.toNumber()));
    }
  }, [account, contract]);

  const mintNFT = useCallback(async () => {
    if (!ceramic || !contract || !account || !self) return;
    setMinting(true);

    try {
      const tx = await contract.safeMint(account);

      await tx.wait();

      const tokenIDBN = await contract.callStatic.safeMint(account);
      const tokenID = tokenIDBN.toNumber() - 1;

      let baseWordUrl;
      try {
        baseWordUrl = await makeNewWordImage({ word: `word#${tokenID}` });
      } catch (error) {
        throw new Error('Could not generate new image.');
      }

      console.log(baseWordUrl);

      // CREATE NEW TOKEN_STREAM
      const newTokenStreamID = await TileDocument.create(
        self.client.ceramic,
        {
          image: baseWordUrl.path,
          name: 'word#' + tokenID.toString(),
          description: 'This is the word token #' + tokenID.toString(),
        },
        {
          schema: erc721Schema,
          controllers: [self.did.id],
          family: 'erc721Metadata',
        },
      );

      console.log(1);

      await updateRegistry({
        tokenID: tokenID.toString(),
        streamID: newTokenStreamID.id.toString(),
      });

      console.log(2);

      await getBalance();
    } catch (error) {
      console.log('error', error);
    }
    setMinting(false);
  }, [account, ceramic, contract, getBalance, self]);

  useEffect(() => {
    getBalance();
  }, [contract, getBalance]);

  return { mintNFT, minting, balance, fetchTokenMetadata };
};

export default useMintMutable;
