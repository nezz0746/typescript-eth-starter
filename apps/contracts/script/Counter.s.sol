// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {BaseScript} from "./Base.s.sol";
import {UpgradeableCounter} from "../src/UpgradeableCounter.sol";
import {UUPSProxy} from "../src/UUPSProxy.sol";

contract CounterScript is BaseScript {
    DeployementChain[] deploymentChains;

    function setUp() public {
        forks[DeployementChain.Anvil] = "local";
        forks[DeployementChain.Goerli] = "goerli";
        forks[DeployementChain.Mumbai] = "mumbai";
        forks[DeployementChain.Sepolia] = "sepolia";
    }

    function deployCounterLocal() public setEnvDeploy(Cycle.Local) {
        deploymentChains.push(DeployementChain.Anvil);

        _deployCounter(deploymentChains);
    }

    function deployCounterTesnet() public setEnvDeploy(Cycle.Testnet) {
        deploymentChains.push(DeployementChain.Sepolia);

        _deployCounter(deploymentChains);
    }

    function _deployCounter(
        DeployementChain[] memory targetChains
    ) internal broadcastOn(targetChains) {
        UpgradeableCounter counterImpl = new UpgradeableCounter();

        UUPSProxy proxy = new UUPSProxy(
            address(counterImpl),
            abi.encodeWithSelector(counterImpl.initialize.selector)
        );

        UpgradeableCounter(address(proxy)).setNumber(42);

        _saveImplementations(address(proxy), "Counter");
    }
}
