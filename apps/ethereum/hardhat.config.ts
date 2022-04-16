import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { EthGasReporterConfig } from "hardhat-gas-reporter/dist/src/types";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const ETHERSCAN_APIKEY = process.env.ETHERSCAN_APIKEY;
const COINMARKETCAP = process.env.COINMARKETMAP;
const ALCHEMY_MUMBAI = process.env.ALCHEMY_MUMBAI;

const reportCurrency = process.env.CURRENCY || "mainnet";

const currencyConfig: Record<string, EthGasReporterConfig> = {
  mainnet: {
    coinmarketcap: COINMARKETCAP,
    enabled: true,
    currency: "USD",
  },
  polygon: {
    coinmarketcap: COINMARKETCAP,
    enabled: true,
    currency: "USD",
    token: "MATIC",
    gasPriceApi:
      "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",
  },
};

const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC =
  process.env.MNEMONIC ||
  "fox sight canyon orphan hotel grow hedgehog build bless august weather swarm";

const getCommonNetworkConfig = (url: string, networkId: number) => ({
  url,
  chainId: networkId,
  accounts: {
    mnemonic: MNEMONIC,
    path: MNEMONIC_PATH,
    initialIndex: 0,
    count: 20,
  },
});

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  namedAccounts: {
    deployer: 0,
    user1: 1,
  },
  paths: {
    artifacts: "./artifacts",
    sources: "contracts",
    deployments: "deployments",
  },
  networks: {
    hardhat: {
      chainId: 31337,
      live: false,
      saveDeployments: true,
      gas: "auto",
      deploy: ["deploy/local"],
      tags: ["local"],
      accounts: {
        mnemonic: MNEMONIC,
        path: MNEMONIC_PATH,
        initialIndex: 0,
        count: 20,
      },
    },
    mumbai: {
      ...getCommonNetworkConfig(
        `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI}`,
        80001
      ),
      live: true,
      saveDeployments: true,
      gas: "auto",
      deploy: ["deploy/mumbai"],
      tags: ["mumbai"],
    },
  },
  gasReporter: currencyConfig[reportCurrency],
  etherscan: {
    apiKey: ETHERSCAN_APIKEY,
  },
  typechain: {
    outDir: "../../packages/types",
    target: "ethers-v5",
  },
};

export default config;
