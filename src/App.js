import './App.css';
import React from 'react';
import logo from './logo.svg'
import { useState } from 'react';

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

function App() {
  const generateRandomPrice = () => {
    return (Math.random() * 10).toFixed(3);
  };

  const exampleData = [];

  for (let i = 1; i < 11; i++) {
    const name = `Example ${i}`;
    const price = `${generateRandomPrice()} ETH`;
    const listing = {name: name, price: price};
    
    exampleData.push(
      <Listing listing={listing} />
    );
  }

  return (
    <div className="App">
      <Top />
      <p className='largeText'>Your decentralised marketplace</p>
      <ListingContainer>
        {exampleData}
      </ListingContainer>
    </div>
  );
}

export default App;
