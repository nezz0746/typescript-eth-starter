/* eslint-disable no-console */
import { useContractFunction } from '@usedapp/core';
import { create } from 'ipfs-http-client';
import { useCallback, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';

const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

const useListPiece = (
  contract: MyNFT,
): {
  listItem: (name: string) => Promise<void>;
  loading: boolean;
  image: File | null;
  addImage: (file: File) => void;
  removeImage: () => void;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const { send: list } = useContractFunction(contract, 'listPiece', {
    transactionName: 'List Piece.',
  });

  const listItem = useCallback(
    async (name: string) => {
      if (image) {
        setLoading(true);
        try {
          // Upload image to IPFS
          const imageIPFS = await client.add(image);

          // Upload NFT Metadata to IPFS
          const added = await client.add(
            JSON.stringify({
              name,
              description: 'MyNFT',
              image: `https://ipfs.infura.io/ipfs/${imageIPFS.path}`,
            }),
          );

          const url = `https://ipfs.infura.io/ipfs/${added.path}`;

          // List on Smart Contract
          list(url);
        } catch (error) {
          console.log(`error`, error);
        }
        setLoading(false);
      }
    },
    [image, list],
  );

  const addImage = useCallback((file: File) => {
    setImage(file);
  }, []);

  const removeImage = useCallback(() => {
    setImage(null);
  }, []);

  return {
    listItem,
    loading,
    image,
    addImage,
    removeImage,
  };
};

export default useListPiece;
