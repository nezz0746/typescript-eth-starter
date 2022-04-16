import { BigNumber } from 'ethers';
import { MyNFT } from 'types';

export type ChainPiece = [string, BigNumber, boolean][];

export type Piece = MyNFT.PieceStruct & {
  metadata: NFTMetaData;
};

export interface NFTMetaData {
  name: string;
  description: string;
  image: string;
}
