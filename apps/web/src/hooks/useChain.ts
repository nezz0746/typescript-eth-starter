import { useNetwork } from "wagmi";
import { defaultChain } from "wagmi-config";
import { localhost } from "wagmi/chains";

const useChain = () => {
  const { chain } = useNetwork();

  const chainId = chain?.id ?? defaultChain.id;

  return {
    isLocal: chainId === localhost.id,
    chainId,
    explorer: chain?.blockExplorers?.etherscan?.url,
  };
};

export default useChain;
