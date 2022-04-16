// NOTE: Redeploy your contracts in the apps/ethereum project to override template deployments
import { ContractExport } from "hardhat-deploy/types";

import local from "./local.json";
import mumbai from "./mumbai.json";

export interface Export {
  chainId: string;
  name: string;
  contracts: { [name: string]: ContractExport };
}

const depployments = {
  local,
  mumbai,
} as Record<"local" | "mumbai", Export>;

export const getDeployment = (chainId: number): Export => {
  switch (chainId) {
    case 31337:
      return local;
    case 80001:
      return mumbai;
    default:
      return local;
  }
};

export default depployments;
