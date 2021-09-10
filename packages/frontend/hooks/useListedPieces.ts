/* eslint-disable no-console */
import { useEthers } from '@usedapp/core';
import { useCallback, useEffect, useState } from 'react';
import { MyNFT } from '../../hardhat/types/MyNFT';
import { formatListedPieces, Piece } from '../utils/helpers';

const useListedPieces = (contract: MyNFT): { pieces: Piece[]; refetchPieces: () => void } => {
  const { account } = useEthers();
  const [pieces, setPieces] = useState<Piece[]>([]);

  const getPieces = useCallback(async () => {
    try {
      if (account) {
        const piecesRes = await contract.getListedPieces();

        console.log('Reading from contract: getListedPieces()');
        setPieces(formatListedPieces(piecesRes));
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
