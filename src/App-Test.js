import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './logo.svg'
import IncrementDecrement from "./IncrementDecrement.json";
const ethers = require("ethers");
const contractAddress = "0x2357bDa7183B598084e3c982b3Ee73467C3aAf76";

function App() {
  const [value, setValue] = useState();
  const [address, setAddress] = useState('');

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

  async function disconnectFromMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Disconnect from MetaMask
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        console.log('Disconnected from MetaMask!');
      } else {
        console.error(
          'MetaMask not found. Please install MetaMask to use this application.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  const DecrementHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await provider.getSigner();

        const Contract = new ethers.Contract(contractAddress, IncrementDecrement.abi, Signer);

        const Tx = await Contract.decrement();
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

  const IncrementHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await provider.getSigner();

        const Contract = new ethers.Contract(contractAddress, IncrementDecrement.abi, Signer);

        const Tx = await Contract.increment();
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

  const ReadContractValue = async () => {
    try {
      if (window.ethereum) {
        console.log(window.ethereum);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const Signer = await provider.getSigner();

        // Create a new instance of the Contract class
        const Contract = new ethers.Contract(contractAddress, IncrementDecrement.abi, Signer);

        // Call the getValue function from the contract
        const Tx = await Contract.getValue();
        console.log('Tx :', Tx);

        setValue(Tx._hex);

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

  const ConvertValue = () => {
    const temp = ethers.BigNumber.from(value).toNumber();
    setValue(temp);
  };


return (
    <div className="App">
      <div className="connectBtns">
        <button className="btn" onClick={connectToMetaMask}>
          Connect To MetaMask
        </button>
      </div>

      <div className="display">
        <p className="key">
          Address: <span className="value">{address}</span>
        </p>

        <div className="valueContainer">
          <p className="key">
            Value: <span>{value}</span>
          </p>

          <button onClick={ConvertValue} className="btn" disabled={!value}>
            deCode
          </button>
        </div>
      </div>

      <div className="actionBtns">
        <button
          className="btn minus"
          onClick={DecrementHandler}
          title="decrement"
        >
          -
        </button>

        <button
          className="btn plus"
          onClick={IncrementHandler}
          title="increment"
        >
          +
        </button>
        <button className="btn" onClick={ReadContractValue} title="read value">
          get value
        </button>
      </div>
    </div>
  );
}

export default App;
