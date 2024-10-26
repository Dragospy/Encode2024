import './App.css';

function Item() {
  return (
    <div style={{border: "2px solid black", "border-radius": "4px", maxWidth: "60rem"}}>
      <h1>Item Name</h1>
      <p>Item description</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Hello Wordl!</h1>
      <Item />
    </div>
  );
}

export default App;
