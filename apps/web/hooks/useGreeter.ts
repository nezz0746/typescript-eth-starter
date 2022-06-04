import { GetContractArgs } from "@wagmi/core";
import {
  useContractRead,
  useContractWrite,
  useSigner,
  useWaitForTransaction,
} from "wagmi";
import useAppContractsConf from "./useContractAddresses";

const useGreeter = (chainId: number) => {
  const appContractConf = useAppContractsConf();

  const { data: signerData } = useSigner();

  const wagmiContractConf: GetContractArgs = {
    addressOrName: appContractConf[chainId].Greeter.address,
    contractInterface: appContractConf[chainId].Greeter.abi,
  };

  const { data: greetRead } = useContractRead(wagmiContractConf, "greet");

  const writeToGreeterTx = useContractWrite(
    { ...wagmiContractConf, signerOrProvider: signerData },
    "setGreeting"
  );

  const { isLoading: writeIsLoading } = useWaitForTransaction({
    hash: writeToGreeterTx.data?.hash,
  });

  return {
    greet: {
      update: (greeter: string) =>
        writeToGreeterTx.writeAsync({ args: [greeter] }),
      loading: writeIsLoading || writeToGreeterTx.isLoading,
      value: greetRead,
    },
    live: appContractConf[chainId] !== undefined, // not used
  };
};

export default useGreeter;
