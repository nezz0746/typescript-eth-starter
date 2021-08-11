//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/utils/Counters.sol";

contract Greeter {
  using Counters for Counters.Counter;
  Counters.Counter public greeted;
  string greeting;

  constructor(string memory _greeting) {
    greeting = _greeting;
    greeted.increment();
  }

  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    greeting = _greeting;
    greeted.increment();
  }
}
