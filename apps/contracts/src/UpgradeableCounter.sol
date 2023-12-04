// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin-upgradeable/contracts/access/OwnableUpgradeable.sol";

contract UpgradeableCounter is OwnableUpgradeable, UUPSUpgradeable {
    uint256 public number;

    event NumberSet(uint256 newValue);

    function initialize() public initializer {
        __Ownable_init();
        number = 0;
    }

    function setNumber(uint256 _number) public {
        number = _number;

        emit NumberSet(_number);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
