pragma solidity ^0.4.18;

contract Storage {
  struct VirtualEstate {
    bytes32 ipfsAddress;
	  uint value;
  }

  VirtualEstate[] public estates;

  function set(bytes32 ipfsAddress, uint value) public {
    estates.push(VirtualEstate(ipfsAddress, value));
  }

  function getAddresses() view external returns (bytes32[], uint[]) {
    bytes32[] memory addresses = new bytes32[](estates.length);
    uint[] memory values = new uint[](estates.length);

    for(uint i = 0; i < estates.length; i++) {
        addresses[i] = estates[i].ipfsAddress;
        values[i] = estates[i].value;
    }

    return (addresses, values);
  }
}
