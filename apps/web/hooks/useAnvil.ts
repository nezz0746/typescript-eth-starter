import { useAccount, useBalance, useNetwork, usePublicClient } from "wagmi";
import { toHex, parseEther } from "viem";

const useAnvil = () => {
  const { address } = useAccount();
  const { request } = usePublicClient();
  const { refetch, data } = useBalance({ address });

  const selfFund = () => {
    if (!address || !data?.value) return;

    request({
      // @ts-ignore
      method: "anvil_setBalance",
      params: [address, toHex(data?.value + parseEther("10"))],
    });
    refetch({});
  };

  return {
    selfFund,
  };
};

export default useAnvil;
