/* eslint-disable no-console */
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { useEthers } from '@usedapp/core';
import { BigNumber } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { MutableNFT } from '../../hardhat/types/MutableNFT';

import { erc721Schema } from '../conf/ceramic';
import { useTypedSelector } from '../redux/store';
import { updateRegistry } from '../services/metadatamanage';
import useSelfID from './useSelfID';

const useMintMutable = (
  contract: MutableNFT | null,
): { mintNFT: () => Promise<void>; balance: number[] } => {
  const { self } = useSelfID();
  const { account } = useEthers();
  const { ceramic } = useTypedSelector((state) => state.app);
  const [balance, setBalance] = useState<number[]>([]);

  const getBalance = useCallback(async () => {
    if (account && contract) {
      const bal = await contract.walletOfOwner(account);

      setBalance(bal.map((bn: BigNumber) => bn.toNumber()));
    }
  }, [account, contract]);

  const mintNFT = useCallback(async () => {
    console.log('{self, contract, account}', { self, contract, account });
    if (!ceramic || !contract || !account || !self) return;

    try {
      const tx = await contract.safeMint(account);

      await tx.wait();

      const tokenIDBN = await contract.callStatic.safeMint(account);
      const tokenID = tokenIDBN.toNumber() - 1;

      // CREATE NEW TOKEN_STREAM
      const newTokenStreamID = await TileDocument.create(
        self.client.ceramic,
        /**
         * Here we are placing the metadata directly in the hands of the owner at creation.
         * This could open doors for creativity and authority by owner on metadata.
         *
         * Things like:
         * - Pick options at creation
         * - Updates of metadata
         *
         * TODO: Think of simple first use-case to implement.
         */
        {
          image:
            'https://lemagdesanimaux.ouest-france.fr/images/dossiers/2021-03/adopter-poney-083907.jpg',
          name: 'PONEY',
          description: 'This is a cute poney',
        },
        {
          schema: erc721Schema,
          controllers: [self.did.id],
          family: 'erc721Metadata',
        },
      );

      await updateRegistry({
        tokenID: tokenID.toString(),
        streamID: newTokenStreamID.id.toString(),
      });

      await getBalance();
    } catch (error) {
      console.log('error', error);
    }
  }, [account, ceramic, contract, getBalance, self]);

  useEffect(() => {
    getBalance();
  }, [contract, getBalance]);

  return { mintNFT, balance };
};

export default useMintMutable;
