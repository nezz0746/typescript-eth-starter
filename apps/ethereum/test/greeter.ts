import "hardhat-deploy";
import { use, expect } from "chai";
import { solidity } from "ethereum-waffle";
import HRE, { ethers, deployments, getNamedAccounts } from "hardhat";
import { Greeter, Greeter__factory } from "types";
import { evmRevert, evmSnapshot } from "./utils";
import { localGreeterDeployArguments } from "../deploy/local/00_deploy_greeter";

use(solidity);

describe("Greeter test suite", function () {
  let snapshotId: string;
  let deployerAddress: string;
  let greeterDeployer: Greeter;
  let greeter1: Greeter;

  before(async () => {
    const { Greeter } = await deployments.fixture(["Greeter"]);

    const { deployer, user1 } = await getNamedAccounts();

    deployerAddress = deployer;
    greeterDeployer = Greeter__factory.connect(
      Greeter.address,
      await ethers.getSigner(deployer)
    );
    greeter1 = Greeter__factory.connect(
      Greeter.address,
      await ethers.getSigner(user1)
    );
    snapshotId = await evmSnapshot(HRE);
  });

  afterEach(async () => {
    try {
      await evmRevert(HRE, snapshotId);
      snapshotId = await evmSnapshot(HRE);
    } catch (error) {
      console.log("AFTER_EACH_ERROR: ", error);
    }
  });

  describe("initialization", () => {
    it("contract should initialize properly", async () => {
      expect(await greeterDeployer.greet()).to.equal(
        localGreeterDeployArguments.greeting
      );
    });
  });

  describe("greeter", () => {
    it("deployer can set new greeting", async () => {
      expect(
        greeterDeployer.setGreeting("I can set new greeting!")
      ).to.not.revertedWith("");
    });
    it("greeter1 can set new greeting", async () => {
      expect(
        greeter1.setGreeting("I can set new greeting!")
      ).to.not.revertedWith("");
    });
  });
});
