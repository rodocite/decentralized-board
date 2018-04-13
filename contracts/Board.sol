pragma solidity ^0.4.18;

import "./Storage.sol";
import "./Bank.sol";

contract Scaffold {
  Storage messageStorage;
  Bank bank;

  function Todo(address _bank, address _storage) public {
    bank = Bank(_bank);
    messageStorage = Storage(_storage);
  }


}

