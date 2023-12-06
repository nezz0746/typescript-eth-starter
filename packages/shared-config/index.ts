export const appName = "Typescript Starter App";

export const alchemy_key =
  import.meta.env.VITE_ALCHEMY_KEY || "YOUR_ALCHEMY_KEY";

export const projectId =
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID";
export const localChainEnabled =
  import.meta.env.VITE_LOCAL_CHAIN_ENABLED === "true";

export const testnetChainEnabled =
  import.meta.env.VITE_TESTNET_CHAINS_ENABLED === "true";

export const mainnetChainEnabled =
  import.meta.env.VITE_MAINNET_CHAINS_ENABLED === "true";

console.log({
  localChainEnabled,
  testnetChainEnabled,
  mainnetChainEnabled,
});
