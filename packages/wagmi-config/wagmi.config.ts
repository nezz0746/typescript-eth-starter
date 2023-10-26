import { defineConfig } from "@wagmi/cli";
import { foundry } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";
import { localhost } from "wagmi/chains";
import fs from "fs/promises";
import { Address } from "wagmi";

const dev = process.env.NODE_ENV !== "production";

export default defineConfig(async () => {
  const chainIds = dev
    ? [localhost.id]
    : (await fs.readdir("../../apps/contracts/deployments", "utf-8")).map(
        (chainId) => parseInt(chainId)
      );

  const deployments: Record<string, Record<number, Address>> = {};

  for (const chainId of chainIds) {
    const contractNames = await fs.readdir(
      `../../apps/contracts/deployments/${chainId}`,
      "utf-8"
    );

    for (const contractName of contractNames) {
      const name = contractName.split(".")[0];
      if (!deployments[name]) deployments[name] = {};
      deployments[name][chainId] = await (
        await fs
          .readFile(
            `../../apps/contracts/deployments/${chainId}/${contractName}`,
            "utf-8"
          )
          .then(JSON.parse)
      ).address;
    }
  }

  console.log({ deployments });

  return {
    out: "generated.ts",
    plugins: [
      foundry({
        project: "../../apps/contracts",
        deployments,
      }),
      react({
        usePrepareContractFunctionWrite: true,
        usePrepareContractWrite: true,
      }),
    ],
  };
});
