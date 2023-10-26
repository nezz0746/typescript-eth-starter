import { foundry } from "@wagmi/cli/plugins";
import { react } from "@wagmi/cli/plugins";

export default {
  out: "generated.ts",
  contracts: [],
  plugins: [
    foundry({
      project: "../../apps/contracts",
    }),
    react({}),
  ],
};
