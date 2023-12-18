import useSWR from "swr";
import { useAccount } from "wagmi";
import { getOwnerNFTsPerChainId } from "../services/alchemy";

const useOwnedNFTs = (chainId: number) => {
  const { address } = useAccount();
  const { data, isLoading, error } = useSWR(
    ["/api/owned-nfts", address, chainId],
    ([, address, chainId]) => getOwnerNFTsPerChainId(address, chainId),
    {}
  );

  return { data, isLoading, error };
};

export default useOwnedNFTs;
