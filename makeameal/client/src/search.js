import "./App.css";
import axios from "axios";
import {useState} from "react";


const Search = () => {
    const [ingredientName, setIngredientName] = useState("");
    const [matchedRecipes, setMatchedRecipes] = useState([]);

   
    const submitIngredient = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/api/post', {
            ingredientName: ingredientName
        }).then(
            (response) => setMatchedRecipes(response.data)
            )
    }
  
    
        return(
            <div>
            <form className = "search_form" onSubmit={submitIngredient}>
                
                <input
                    type="text"
                    placeholder="type your ingredient"
                    name="ingredientName"
                    onChange={ (e)=> {
                        //console.log(e.target.value)
                        
                        setIngredientName(e.target.value)
                    }}
                    
                />
                <button type="submit"><i className="fa fa-search"></i></button>
                </form>

                <div className = "result-list-container">
                {matchedRecipes.map((val)=>{
                    
                    return(
                        <div key={val.id}>
                            <ul >
                                <li ><h2>{val.title}</h2></li>
                                <li ><h4>Ingredient:</h4> <span>{val.ingredients}</span></li>
                                <li ><h4>Directions:</h4> {val.directions}</li>
                                <li ><h4>Your ingredients: </h4> {val.ingredients_string}</li>
                            </ul>
                        </div>
                    )
                    
                    
                })}
                </div>
           </div>
           
        );

    
    //})
   
    
}

export default Search;