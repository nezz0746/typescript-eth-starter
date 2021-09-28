// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract } from 'ethers';
import { config, ethers, network } from 'hardhat';
import fs from 'fs';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  fs.unlinkSync(`${config.paths.artifacts}/contracts/addresses/${network.name}ContractAddress.ts`);

  // We get the contract to deploy
  const GreeterContract = await ethers.getContractFactory('Greeter');
  const contract = await GreeterContract.deploy('Hello, Hardhat!');
  await contract.deployed();
  console.log('Greeter deployed to:', contract.address);

  const MyNFTContract = await ethers.getContractFactory('MyNFT');
  const myNFTContractDeployement = await MyNFTContract.deploy();
  await myNFTContractDeployement.deployed();
  console.log('MyNFT deployed to:', myNFTContractDeployement.address);

  const MulticallContract = await ethers.getContractFactory('Multicall');
  const multiCallContract = await MulticallContract.deploy();
  await multiCallContract.deployed();
  console.log('Multicall deployed to:', multiCallContract.address);

  saveFrontendFiles(contract, "GreeterContract");
  saveFrontendFiles(myNFTContractDeployement, "MyNFTContract")
  saveFrontendFiles(multiCallContract, "MulticallContract");
}

function saveFrontendFiles(contract: Contract, contractName: string) {
  fs.appendFileSync(
    `${config.paths.artifacts}/contracts/addresses/${network.name}ContractAddress.ts`,
    `export const ${contractName}Address = '${contract.address}'\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
