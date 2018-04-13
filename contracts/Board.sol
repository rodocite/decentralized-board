pragma solidity ^0.4.18;

import "./Storage.sol";
import "./Bank.sol";

contract Board {
  Storage messageStorage;
  Bank bank;

  function Board(address _storage, address _bank) public {
    messageStorage = Storage(_storage);
    bank = Bank(_bank);
  }

  function setAddress(bytes32 ipfsAddress) public payable {
    messageStorage.set(ipfsAddress);
  }

  function getAddress() public view returns (bytes32) {
      return messageStorage.getAddress();
  }
}

