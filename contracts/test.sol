// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {KrnlRelgistered, KrnlPayload} from "./KrnlRegistered.sol";

contract Listing is KrnlRegistered {
    //Properties
    uint public data;
 
    constructor(address _tokenAuthorityPublicKey) KrnlRegistered(_tokenAuthorityPublicKey) {
        data = 0;
    }

    function setData(
        KrnlPayload memory krnlPayload,
        uint _data
    )
        external
        onlyAuthorized(krnlPayload, abi.encodePacked(key, value))
    {
        data = data + _data;
    }

    function getData() public view returns (uint) {
        return data;
    }

}
