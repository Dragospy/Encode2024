 //About.js
 import './css/App.css';
 import React, { useState, useEffect , useRef} from 'react';
 import logo from './svgs/logo.svg'
 import MarketPlace from "./contractJsons/MarketPlace.json";
 import Navbar from '../components/Navbar'
 const ethers = require("ethers");
 const contractAddress = "0xC56a93C923e2105830B450c311F4061D021E4A06";

const addNewListingToChain = async (listingName, listingPrice) => {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await provider.getSigner();

      const Contract = new ethers.Contract(contractAddress, MarketPlace.abi, Signer);

      const Tx = await Contract.addListing(Signer, listingName, listingPrice);
      const TxRecit = await Tx.wait();
      console.log('after :', TxRecit);
    } else {
      console.error(
        'MetaMask not found. Please install MetaMask to use this application.',
      );
    }
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

function NewListing(){
  const [listingName, setListingName] = useState('');
  const [listingPrice, setListingPrice] = useState('');

  return(
    <div>
      <form>
      <label>
        Listing Name:
        <input
          type="text"
          value={listingName}
          onChange={(e) => setListingName(e.target.value)}
        />
      </label>
      <label>
        Listing Price:
        <input
          type="text"
          value={listingPrice}
          onChange={(e) => setListingPrice(e.target.value)}
        />
      </label>
    </form>
    <button className="btn" onClick={() => addNewListingToChain(listingName, listingPrice)}>
          Publish Listing
    </button>
    </div>
  );
}

 function ListingCreation() {
   return (
     <div>
         <Navbar />
         <NewListing />
     </div>
   )
 }

 export default ListingCreation

