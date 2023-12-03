// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin-upgradeable/contracts/access/OwnableUpgradeable.sol";

contract Counter is OwnableUpgradeable, UUPSUpgradeable {
    uint256 public number;

    function initialize() public initializer {
        __Ownable_init();
        number = 0;
    }

    function increment() public {
        number++;
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
