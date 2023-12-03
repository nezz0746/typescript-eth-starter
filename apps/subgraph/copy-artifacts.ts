import { counterABI, counterAddress } from "wagmi-config/generated";
import fs from "fs/promises";

const chainIdToNetwork = {
  1337: "localhost",
  5: "goerli",
  84531: "base-testnet",
};

const main = async () => {
  for (const [chainId, address] of Object.entries(counterAddress)) {
    await fs.writeFile(
      `./config/${chainId}.json`,
      JSON.stringify(
        {
          counterAddress: address,
          startBlock: 0,
          network: chainIdToNetwork[chainId],
        },
        null,
        2
      )
    );
  }

  await fs.writeFile(
    "./abis/Counter.json",
    JSON.stringify(counterABI, null, 2)
  );
};

main();
