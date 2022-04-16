import "hardhat-deploy";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

export type GreeterDeployArguments = {
  greeting: string;
};

export const localGreeterDeployArguments: GreeterDeployArguments = {
  greeting: "Hello World!",
};

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("Greeter", {
    from: deployer,
    args: [localGreeterDeployArguments.greeting],
    log: true,
  });
};
export default func;
func.tags = ["local", "Greeter"];
