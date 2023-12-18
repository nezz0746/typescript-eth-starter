import { Address } from "wagmi";
import { OwnedNft as AlchemyOwnedNFT } from "alchemy-sdk";
import { getAlchemyNFT } from "shared-config";

export interface OwnedNft extends AlchemyOwnedNFT {
  chainId: number;
}

export const getOwnerNFTsPerChainId = async (
  owner: Address | undefined,
  chainId: number
) => {
  if (!owner) return;
  const nft = getAlchemyNFT(chainId);

  const { ownedNfts: response } = await nft.getNftsForOwner(owner);

  return response.map((nft) => ({ ...nft, chainId }));
};
