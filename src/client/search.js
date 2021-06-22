import "./App.css";
import axios from "axios";
import {useState, useEffect} from "react";

const Search = () => {
    const [ingredientName, setIngredientName] = useState("");

    /*const submitIngredient = () => {
         Axios.post('http://localhost:3001/api/post', {
            ingredientName: ingredientName
        }).then(() => {
            alert('ingredient sent');
        })
    }*/
    
    async function submitIngredient(e){
        e.preventDefault();
        try{
            await axios.post('http://localhost:3001/api/post',
               { ingredientName: ingredientName });
        }catch(err){
            console.error(err);
        }
    }
    return( 
        <form className = "search_form" onSubmit={submitIngredient}>
            <label>Search Bar</label>
            <input
                type="text"
                placeholder="type your ingredient"
                name="ingredientName"
                onChange={ (e)=> {
                    setIngredientName(e.target.value)
                }}
                
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;