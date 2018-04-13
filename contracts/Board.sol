pragma solidity ^0.4.18;

import "./Storage.sol";
import "./Bank.sol";

contract Board {
  Storage messageStorage;
  Bank bank;
  address owner;

  function Board(address _bank, address _storage) public {
    messageStorage = Storage(_storage);
    bank = Bank(_bank);
    owner = msg.sender;
  }

  function setAddress(bytes32 ipfsAddress) public payable {
    messageStorage.set(ipfsAddress);
    bank.deposit(owner);
  }

  function getAddress() public view returns (bytes32) {
    return messageStorage.getAddress();
  }

  function getOwner() public view returns (address) {
    return owner;
  }
}