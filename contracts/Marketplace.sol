// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract IncrementDecrement{
    uint256 value;

    event Increment(string message);
    event Decrement(string message);

    function increment() public {
        value++;

        emit Increment("value incremented by 1");

    }

    function decrement() public {
        value--;

        emit Decrement("value decremented by 1");
    }
    /*
    function reset() public {
        value = 0;
    }
    */

    function getValue() public view returns (uint256) {
        return value;
    }
}