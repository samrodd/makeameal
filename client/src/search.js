import "./App.css";
import axios from "axios";
import {useState} from "react";


const Search = () => {
    const [ingredientName, setIngredientName] = useState("");
    const [matchedRecipes, setMatchedRecipes] = useState([]);

    const refresh = () => {
        console.log("am i refreshing")
        return window.location.reload();
    }
    const submitIngredient = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/api/post', {
            ingredientName: ingredientName
        }).then(
            (response) => setMatchedRecipes(response.data)
            )
    }
    /*
    useEffect(()=> {

        axios.get('http://localhost:3001/api/get').then((response)=>{
            console.log(response.data)
            setMatchedRecipes(response.data)
        })
    }, [])*/
    
        return( 
            <form className = "search_form" onSubmit={submitIngredient}>
                <label>Search Bar</label>
                <input
                    type="text"
                    placeholder="type your ingredient"
                    name="ingredientName"
                    onChange={ (e)=> {
                        console.log(e.target.value)
                        setIngredientName(e.target.value)
                    }}
                    
                />
                <button type="submit">Search</button>
                {matchedRecipes.map((val)=>{
                    return(
                        <div key={val.id}>
                            <ul >
                                <li >Title: {val.title}</li>
                                <li >Ingredient: {val.ingredients}</li>
                                <li >Directions: {val.directions}</li>
                                <li >Ingredient string: {val.ingredients_string}</li>
                            </ul>
                        </div>
                    )
                    
                })}
            </form>   
        );

    
    //})
   
    
}

export default Search;