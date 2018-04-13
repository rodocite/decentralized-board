pragma solidity ^0.4.18;

contract Storage {
  string public ipfsAddress_;

  function getByAddress() public view returns (string) {
    return ipfsAddress_;
  }

  function insert(string ipfsAddress) public {
    ipfsAddress_ = ipfsAddress;
  }
}
