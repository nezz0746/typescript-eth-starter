// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";

contract BaseScript is Script {
    enum Cycle {
        Local,
        Testnet,
        Mainnet
    }

    enum DeployementChain {
        Anvil,
        Goerli,
        Sepolia,
        Mumbai
    }
    string internal mnemonic =
        "test test test test test test test test test test test junk";

    uint256 internal deployerPrivateKey;

    mapping(DeployementChain => string forkId) public forks;

    modifier broadcastOn(DeployementChain[] memory targetChains) {
        for (uint256 i = 0; i < targetChains.length; i++) {
            vm.createSelectFork(forks[targetChains[i]]);
            console2.log("Broadcasting on chain: ", forks[targetChains[i]]);
            vm.startBroadcast(deployerPrivateKey);
            _;
            vm.stopBroadcast();
            console2.log(
                "Broadcasting on chain: ",
                forks[targetChains[i]],
                " done"
            );
        }
    }

    modifier setEnvDeploy(Cycle cycle) {
        if (cycle == Cycle.Local) {
            (, deployerPrivateKey) = deriveRememberKey({
                mnemonic: mnemonic,
                index: 1
            });
        } else if (cycle == Cycle.Testnet) {
            deployerPrivateKey = vm.envUint("TESTNET_PK");
        } else if (cycle == Cycle.Mainnet) {
            deployerPrivateKey = vm.envUint("MAINNET_PK");
        }

        _;
    }

    function _saveImplementations(
        address contractAddress,
        string memory contractName
    ) internal {
        string memory objectName = "export";
        string memory json;

        string memory filePathWithEncodePacked = string(
            abi.encodePacked(
                "./deployments/",
                vm.toString(block.chainid),
                "/",
                contractName,
                ".json"
            )
        );

        json = vm.serializeAddress(objectName, "address", contractAddress);
        json = vm.serializeUint(objectName, "startBlock", block.number);

        vm.writeFile(filePathWithEncodePacked, json);
    }
}
