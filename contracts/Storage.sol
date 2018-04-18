pragma solidity ^0.4.20;

contract Storage {
  address owner;

  function Storage(address owner_) public {
    owner = owner_;
  }

  struct VirtualEstate {
    bytes32 ipfsAddress;
	  uint value;
  }

  VirtualEstate[] public estates;

  function set(bytes32 ipfsAddress) public payable {
    require(msg.value > 0 ether);
    estates.push(VirtualEstate(ipfsAddress, msg.value));
    owner.transfer(msg.value);
  }

  function getAddresses() view public returns (bytes32[], uint[]) {
    bytes32[] memory addresses = new bytes32[](estates.length);
    uint[] memory values = new uint[](estates.length);

    for(uint i = 0; i < estates.length; i++) {
        addresses[i] = estates[i].ipfsAddress;
        values[i] = estates[i].value;
    }

    return (addresses, values);
  }
}
