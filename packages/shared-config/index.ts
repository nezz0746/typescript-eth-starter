export const appName = "Typescript Starter App";

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID";
export const baseAlchemyKey =
  process.env.NEXT_PUBLIC_BASE_ALCHEMY_KEY || "YOUR_ALCHEMY_KEY";
export const localChainEnabled =
  process.env.NEXT_PUBLIC_LOCAL_CHAIN_ENABLED === "true";

export const testnetChainEnabled =
  process.env.NEXT_PUBLIC_TESTNET_CHAINS_ENABLED === "true";

export const mainnetChainEnabled =
  process.env.NEXT_PUBLIC_MAINNET_CHAINS_ENABLED === "true";

console.log({
  localChainEnabled,
  testnetChainEnabled,
  mainnetChainEnabled,
});
