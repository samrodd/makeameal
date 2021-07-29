import './App.css';
import './search.css'
import './ingredientsInput.css'
import Search from './Search';


function App() {
  return (
    <div className="App">
      <div className="hero-image">
      <div className="hero-text">

        <h1>Make A Meal</h1>
        <h2>Create your meal now based on the ingredients you have at hand!</h2>

      </div>
      </div>

      <Search />
        
        
    </div>
  );
}

export default App;
