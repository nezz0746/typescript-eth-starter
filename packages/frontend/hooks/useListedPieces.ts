/* eslint-disable no-console */
import { useQuery, gql } from '@apollo/client';
import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';
import { Piece } from '../types';
import { formatListedPieces } from '../utils/helpers';

const GET_PIECES = gql`
  query GetPieces {
    pieces {
      id
      tokenURI
      tokenId
      minted
      owner
      creator
    }
  }
`;

const useListedPieces = (contract: MyNFT): { pieces: Piece[]; refetchPieces: () => void } => {
  const { account } = useEthers();
  const [pieces, setPieces] = useState<Piece[]>([]);
  const { data } = useQuery(GET_PIECES);

  console.log(`data`, data);

  const getPieces = useCallback(async () => {
    try {
      if (account) {
        const piecesRes = await contract.getListedPieces();

        const newPieces = await formatListedPieces(piecesRes);

        setPieces(newPieces);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  }, [account, contract]);

  useEffect(() => {
    getPieces();
  }, [getPieces]);

  return {
    pieces,
    refetchPieces: getPieces,
  };
};

export default useListedPieces;
