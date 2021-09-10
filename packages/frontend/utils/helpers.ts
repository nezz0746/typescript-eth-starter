import { BigNumber } from '@ethersproject/bignumber';

export type ChainPiece = [string, BigNumber, boolean][];

export interface Piece {
  tokenURI: string;
  tokenId: number;
  minted: boolean;
}

export const formatListedPieces = (chainListedPieces: ChainPiece): Piece[] => {
  return chainListedPieces.map((piece) => ({
    tokenURI: piece[0],
    tokenId: piece[1].toNumber(),
    minted: piece[2],
  }));
};
