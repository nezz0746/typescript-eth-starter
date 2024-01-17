import { counterABI, counterAddress } from "wagmi-config/generated";
import fs from "fs/promises";

const chainIdToNetwork = {
  1337: "localhost",
  5: "goerli",
  80001: "mumbai",
  84531: "base-testnet",
  11155111: "sepolia",
};

/**
 * This is a list of all the artifacts we want to copy over to the subgraph
 * or any other package that needs them.
 */
const artifacts = [
  {
    name: "Counter",
    abi: counterABI,
    addresses: counterAddress,
    chainIds: Object.keys(counterAddress).map((chainId) => parseInt(chainId)),
  },
] as const;

const getDeploymentStartBlock = async (name: string, chainId: number) => {
  return fs
    .readFile(`../contracts/deployments/${chainId}/${name}.json`, "utf-8")
    .then(JSON.parse)
    .then((dep) => dep.startBlock);
};

const main = async () => {
  for (const artifact of artifacts) {
    for (const chainId of artifact.chainIds) {
      await fs.writeFile(
        `./config/${chainId}.json`,
        JSON.stringify(
          {
            counterAddress: artifact.addresses[chainId],
            startBlock: await getDeploymentStartBlock(artifact.name, chainId),
            network: chainIdToNetwork[chainId],
          },
          null,
          2
        )
      );
      await fs.writeFile(
        `./abis/${artifact.name}.json`,
        JSON.stringify(artifact.abi, null, 2)
      );
    }
  }
};

main();
