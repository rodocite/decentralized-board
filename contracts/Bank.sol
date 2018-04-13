pragma solidity ^0.4.18;

contract Bank {
  address public owner;

  function Bank() public {
    owner = msg.sender;
  }

  function withdraw() public {
    require(owner == msg.sender);
    msg.sender.transfer(address(this).balance);
  }

  function deposit(uint256 amount) public payable {
    msg.sender.transfer(amount);
  }
}