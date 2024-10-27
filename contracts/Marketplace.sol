// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract MarketPlace{

    uint256 listingCount = 1;

    struct listing {
        address ownerWallet;
        string name;
        string price;
        uint256 id;
    }


    mapping (uint256 => listing) public marketListings;

    event Increment(string message);
    event Decrement(string message);

    function addListing(address owner, string memory name, string memory price) public {
        marketListings[listingCount] = listing(owner, name, price, listingCount);

        listingCount++;

        emit Increment("Created a new listing");
    }

    function removeListing(uint256 listingID) public {
        
        delete marketListings[listingID];

        emit Decrement("Removed listing");
    }
    
    function getListingCount() public view returns (uint256){
        return listingCount;
    }

    function getListings() public view returns (listing[] memory) {
        listing[] memory ret = new listing[](listingCount);
        for (uint i = 0; i < listingCount; i++) {
            ret[i] = marketListings[i];
        }
        return ret;
    }
}