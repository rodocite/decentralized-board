pragma solidity ^0.4.18;

contract Bank {
  mapping(bytes32 => uint) Vault;

  function getTodoDeposit(bytes32 _id) public view returns (uint) {
    return Vault[_id];
  }

  function setTodoDeposit(bytes32 _id, uint _deposit) public {
    Vault[_id] = _deposit;
  }
}
