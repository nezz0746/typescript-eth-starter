/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { TileDocument } from '@ceramicnetwork/stream-tile';
import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MutableNFT } from '../../hardhat/types/MutableNFT';

import { erc721Schema } from '../conf/ceramic';
import { name_of_point } from '../conf/names';
import { ERC721, setTokenBalance } from '../redux/app';
import { useTypedSelector } from '../redux/store';
import { getMetadata, updateRegistry } from '../services/metadatamanage';
import { makeNewWordImage } from '../services/wordmaker';
import useSelfID from './useSelfID';

const useMintMutable = (
  contract: MutableNFT | null,
): {
  mintNFT: () => Promise<void>;
  minting: boolean;
  getBalance: () => Promise<void>;
  fetchTokenMetadata: (tokenID: number) => Promise<Record<string, string> | undefined>;
} => {
  const d = useDispatch();
  const [minting, setMinting] = useState(false);
  const { self } = useSelfID();
  const { account } = useEthers();
  const { ceramic } = useTypedSelector((state) => state.app);

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

      const balanceAndMetadata = await Promise.all(
        bal.map(
          (tokenID) =>
            new Promise<ERC721>((res) => {
              fetchTokenMetadata(tokenID.toNumber()).then((data) => {
                // @ts-ignore
                res({ tokenID: tokenID.toNumber(), data });
              });
            }),
        ),
      );

      d(setTokenBalance(balanceAndMetadata));
    }
  }, [account]);

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

      // CREATE NEW TOKEN_STREAM
      const newTokenStreamID = await TileDocument.create(
        self.client.ceramic,
        {
          image: baseWordUrl.path,
          name: `${name_of_point}#` + tokenID.toString(),
          description: 'This is the token #' + tokenID.toString(),
          geo_feature: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [3, 50.5],
            },
            properties: {
              name: name_of_point + tokenID,
              description: `${name_of_point} - 99`,
            },
          },
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

  return { mintNFT, minting, fetchTokenMetadata, getBalance };
};

export default useMintMutable;
