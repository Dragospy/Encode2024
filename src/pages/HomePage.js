import './css/App.css';
import React, { useEffect } from 'react';
import logo from './svgs/logo.svg'
import { useState, useAsync} from 'react';
import MarketPlace from "./contractJsons/MarketPlace.json";
import Navbar from '../components/Navbar'
import { wait } from '@testing-library/user-event/dist/utils';
const ethers = require("ethers");
const contractAddress = "0xC56a93C923e2105830B450c311F4061D021E4A06";

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


function Dropdown() {
  const [selectedOption, setSelectedOption] = useState('');

  const options = [
    { value: 'art', label: 'Art' },
    { value: 'nft', label: 'NFTs' },
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleChange}>
        <option value="">Filter</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

function SearchBar() {
  return (
    <input className='searchBar'></input>
  )
}

function Top() {
  return (
    <div className='top'>
      <span className='largeText'>decentralise</span>
      <SearchBar />
      <Dropdown />
    </div>
  )
}

function Listing({ listing }) {
  return (
    <div className="listing">
      <div className='listingImage'></div>
      <div className="ListingName">{listing.name}</div>
      <div className='listingPrice'><strong>{listing.price}</strong></div>
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
      //console.log('Listings Array :', listings[1]);
      
      return listings
    }
    else {
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


function HomePage()  {
  const [listings, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      // MetaMask is connected
      const selectedAddress = window.ethereum.selectedAddress;
      console.log(`Connected to MetaMask with address: ${selectedAddress}`);
    } else {
      // MetaMask is not connected
      console.log('MetaMask is not connected');
    }
  }, []);

  async function connectToMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const Accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAddress(Accounts[0]);
        console.log('Connected to MetaMask!', Accounts);
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function fetchData(){

      try {
        if (address){
          const listings = await GetMarketListings();
          setData(listings);
          setLoading(false);
        }

      }
      catch (error){
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  })

  const generateRandomPrice = () => {
    return (Math.random() * 10).toFixed(3);
  };

  if (!address){
    return (<div className="connectBtns">
        <button className="btn" onClick={connectToMetaMask}>
          Connect To MetaMask
        </button>
      </div>);
  }

  if (loading) {
    return <div> Loading...</div>
  }

  if (error) {
    return <div> error.message</div>
  }


  const listingData = [];
  for (let i = 0; i < listings.length; i++){
    if (listings[i].name != ""){
      const name = listings[i].name;
      const price = `${listings[i].price} ETH`;
      const listing = {name: name, price: price};
      
      listingData.push(
        <Listing listing={listing} />
    );
    }
  }

  return (
    <div className="App">
      <Navbar />
      <Top />
      <p className='largeText'>Your decentralised marketplace</p>
        <ListingContainer>
          {listingData}
        </ListingContainer>
    </div>
  );
}

export default HomePage;

