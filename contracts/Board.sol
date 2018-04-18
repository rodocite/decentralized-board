pragma solidity ^0.4.18;

import "./Storage.sol";

contract Board {
  Storage messageStorage;
  address owner;

  function Board(address _storage) public {
    owner = msg.sender;
    messageStorage = Storage(_storage);
  }

  function setAddress(bytes32 ipfsAddress) public {
    messageStorage.set(ipfsAddress);
  }

  function getAddress() public view returns (bytes32) {
    return messageStorage.getAddress();
  }
}