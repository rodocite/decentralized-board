pragma solidity ^0.4.18;

contract Bank {
  function deposit(address owner) public payable {
    owner.transfer(msg.value);
  }
}