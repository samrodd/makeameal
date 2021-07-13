import React from 'react';
import './App.css';
import Search from './search';



function App() {
  return (
    <div className="App">
      <div style={{
        backgroundImage: `url("https://i.pinimg.com/originals/1d/93/e9/1d93e9df8121ff0c4c6dcb8650b101ec.jpg)`
      }}>
      <h1>Make A Meal</h1>
      <h4>Create your meal now based on the ingredients you have at hand!</h4>
      <Search />
      </div>
    </div>
  );
}

export default App;
