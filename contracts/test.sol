// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Listing {
    //Properties
    uint public data;
 
    constructor(){
        data = 0;
    }
 
    function setData(uint _data) public {
        data = data + _data;
    }
 
    function getData() public view returns (uint) {
        return data;
    }
}