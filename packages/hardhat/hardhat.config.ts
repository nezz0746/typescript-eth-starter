import { task } from 'hardhat/config'
import dotenv from 'dotenv'
import "@typechain/hardhat"
import '@nomiclabs/hardhat-waffle'
import { HardhatUserConfig } from 'hardhat/types';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;
const RINKEBY_PRIVATE_KEY = process.env.NEXT_PUBLIC_RINKEBY_PRIVATE_KEY

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  paths: {
    artifacts: '../frontend/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    }
  },
  typechain: {
    outDir: '../types',
    target: "ethers-v5"
  },
};

export default config;
