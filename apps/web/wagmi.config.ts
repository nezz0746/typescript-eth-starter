import { foundry } from "@wagmi/cli/plugins";

export default {
  out: "src/generated.js",
  contracts: [],
  plugins: [
    foundry({
      project: "../contracts",
    }),
  ],
};
