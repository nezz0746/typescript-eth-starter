import { ChainPiece, Piece } from '../types';

export const formatListedPieces = async (chainListedPieces: ChainPiece): Promise<Piece[]> => {
  const pieces = await Promise.all(
    chainListedPieces
      .map((piece) => ({
        tokenURI: piece[0],
        tokenId: piece[1].toNumber(),
        minted: piece[2],
      }))
      .map((pc) =>
        fetch(pc.tokenURI).then(async (res) => {
          const metadata = await res.json();

          return {
            ...pc,
            metadata,
          };
        }),
      ),
  );

  return pieces;
};
