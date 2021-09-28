import { BigNumber } from 'ethers';

export type ChainPiece = [string, BigNumber, boolean][];

export interface Piece {
  tokenURI: string;
  tokenId: number;
  minted: boolean;
  metadata: NFTMetaData;
}

export interface NFTMetaData {
  name: string;
  description: string;
  image: string;
}
