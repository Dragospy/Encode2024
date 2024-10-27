import './css/App.css';
import React, { useState, useEffect , useRef} from 'react';
import logo from './svgs/logo.svg'
import MarketPlace from "./contractJsons/MarketPlace.json";
import Navbar from '../components/Navbar'
const ethers = require("ethers");
const contractAddress = "0xC56a93C923e2105830B450c311F4061D021E4A06";

function SearchBar() {
  return (
    <input className='searchBar'></input>
  )
}

function Listing({ listing }) {
  return (
    <div className="listing">
      <div className="ListingName">{listing.name}</div>
      <div className='listingPrice'>{listing.price}</div>
    </div>
  );
}

function ListingContainer({ children }) {
  return (
    <div className='listingContainer'>
      {children}
    </div>
  );
}

const GetMarketListings = async () => {
  try {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const Signer = await provider.getSigner();

      // Create a new instance of the Contract class
      const Contract = new ethers.Contract(contractAddress, MarketPlace.abi, Signer);

      // Call the getValue function from the contract
      const listings = await Contract.getListings();
      console.log('Listings Array :', listings);
      
      return listings
    } else {
      console.error(
        'MetaMask not found. Please install MetaMask to use this application.',
      );
    }
  } catch (error) {
    console.error("This is what happened")
    console.log(error);
    alert(error);
  }
};

function HomePage() {
  const exampleListing = { image: { logo }, imageAlt: "React logo", name: "Example", price: "0.02 ETH" }

  function DisplayListings(){
    var listings = GetMarketListings();
    const listingsToRender = () => {
      const listItems = [];
      for (let i = 0; i < listings.length; i++){
        if (listings[i].name != ""){
          console.log(listings[i])
          listItems.push(<Listing listing = {{name: listings[i].name, price: listings[i].price}}/>);
        }
      }
      return listItems;
    }
  
    return listingsToRender;
  }

  const ListingsToDisplay = DisplayListings();


  return (
    <div>
      <Navbar />
      <SearchBar />
      <ListingContainer>
        <listingsToDisplay/>
      </ListingContainer>
    </div>
  );
}

export default HomePage;
