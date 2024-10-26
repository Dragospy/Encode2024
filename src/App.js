import './App.css';
import React from 'react';
import logo from './logo.svg'

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

function App() {
  const exampleListing = { image: { logo }, imageAlt: "React logo", name: "Example", price: "0.02 ETH" }

  return (
    <div className="App">
      <SearchBar />
      <ListingContainer>
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
        <Listing listing={exampleListing} />
      </ListingContainer>
    </div>
  );
}

export default App;
