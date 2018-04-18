pragma solidity ^0.4.18;

import "browser/Storage.sol";

contract Board {
  Storage messageStorage;
  address owner;

  function Board(address _storage) public {
    owner = msg.sender;
    messageStorage = Storage(_storage);
  }

  function setAddress(bytes32 ipfsAddress) public payable {
    require(msg.value > 0 ether);
    messageStorage.set(ipfsAddress, msg.value);
    owner.transfer(msg.value);
  }

  function getAddress() public view returns (bytes32[], uint[]) {
    return messageStorage.getAddresses();
  }
}