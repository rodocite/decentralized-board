pragma solidity ^0.4.20;

contract Storage {
  address owner;

  function Storage(address owner_) public {
    owner = owner_;
  }

  struct Message {
    bytes32 ipfsAddress;
	  uint value;
  }

  Message[] public messages;

  function setAddress(bytes32 ipfsAddress) public payable {
    require(msg.value > 0 ether);
    messages.push(Message(ipfsAddress, msg.value));
    owner.transfer(msg.value);
  }

  function getAddresses() view public returns (bytes32[], uint[]) {
    bytes32[] memory addresses = new bytes32[](messages.length);
    uint[] memory values = new uint[](messages.length);

    for(uint i = 0; i < messages.length; i++) {
        addresses[i] = messages[i].ipfsAddress;
        values[i] = messages[i].value;
    }

    return (addresses, values);
  }
}
