import React from 'react';
import './App.css';
import Search from './search';

function App() {
  return (
    <div className="App">
      <h1>Make A Meal</h1>
      <h4>Create your meal now based on the ingredients you have at hand!</h4>

      <Search />
      <input type="text" name="ingredient" />
    </div>
  );
}

export default App;
