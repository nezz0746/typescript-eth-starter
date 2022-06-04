import HardhatGreeter from "../artifacts/hardhat/Greeter.json";
import MumbaiGreeter from "../artifacts/mumbai/Greeter.json";

export type EthConf = {
  abi: any;
  address: string;
};

export type EthAppConfig = {
  Greeter: EthConf;
};

const useAppContractsConf = (): Record<number, EthAppConfig> => {
  return {
    31337: {
      Greeter: {
        abi: HardhatGreeter.abi,
        address: HardhatGreeter.address,
      },
    },
    80001: {
      Greeter: {
        abi: MumbaiGreeter.abi,
        address: MumbaiGreeter.address,
      },
    },
  };
};

export default useAppContractsConf;
