// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";
import {Counter} from "../src/Counter.sol";

contract CounterScript is Script {
    enum DeployementChain {
        Anvil,
        Goerli
    }

    string internal constant TEST_MNEMONIC =
        "test test test test test test test test test test test junk";

    string internal mnemonic;

    address internal broadcaster;
    uint256 internal privateKey;

    mapping(DeployementChain => string forkId) public forks;

    DeployementChain[] public deploymentChains;

    constructor() {
        address from = vm.envOr({name: "PK", defaultValue: address(0)});
        if (from != address(0)) {
            broadcaster = from;
        } else {
            mnemonic = vm.envOr({
                name: "MNEMONIC",
                defaultValue: TEST_MNEMONIC
            });
            (broadcaster, privateKey) = deriveRememberKey({
                mnemonic: mnemonic,
                index: 0
            });
        }
    }

    modifier broadcastOn(DeployementChain[] memory targetChains) {
        for (uint256 i = 0; i < targetChains.length; i++) {
            vm.createSelectFork(forks[targetChains[i]]);
            console2.log("Broadcasting on chain: ", forks[targetChains[i]]);
            vm.startBroadcast(broadcaster);
            _;
            vm.stopBroadcast();
            console2.log(
                "Broadcasting on chain: ",
                forks[targetChains[i]],
                " done"
            );
        }
    }

    function setUp() public {
        forks[DeployementChain.Anvil] = "local";
        forks[DeployementChain.Goerli] = "goerli";

        deploymentChains.push(DeployementChain.Anvil);
        // deploymentChains.push(DeployementChain.Goerli);
    }

    function run() public {
        _deployCounter(deploymentChains);
    }

    function _deployCounter(
        DeployementChain[] memory targetChains
    ) internal broadcastOn(targetChains) {
        Counter counter = new Counter();

        counter.setNumber(42);

        _saveImplementations(address(counter), "Counter");
    }

    function _saveImplementations(
        address contractAddress,
        string memory contractName
    ) internal {
        string memory objectName = "export";
        string memory json;

        console2.log(block.chainid);

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

        vm.writeFile(filePathWithEncodePacked, json);
    }
}
