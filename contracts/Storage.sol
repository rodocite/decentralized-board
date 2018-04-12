pragma solidity ^0.4.18;

contract Storage {
  mapping(bytes32 => bytes32[]) Store;

  function getByIndex(uint _index, bytes32 _user) public view returns (bytes32) {
    return Store[_user][_index];
  }

  function getCount(bytes32 _user) public view returns (uint) {
    return Store[_user].length;
  }

  function insert(bytes32 _todoId, bytes32 _user) public {
    Store[_user].push(_todoId);
  }
}
