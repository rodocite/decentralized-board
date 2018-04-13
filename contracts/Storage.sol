pragma solidity ^0.4.18;

contract Storage {
  bytes32 public ipfsAddress_;

  function set(bytes32 ipfsAddress) public {
    ipfsAddress_ = ipfsAddress;
  }

  function getAddress() public view returns (bytes32) {
    return ipfsAddress_;
  }
}