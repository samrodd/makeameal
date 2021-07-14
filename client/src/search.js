import "./App.css";
import axios from "axios";
import {useState, useEffect} from "react";


const Search = () => {
    const [ingredientName, setIngredientName] = useState("");
    const [matchedRecipes, setMatchedRecipes] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:3001/api/get').then((response)=>{
            console.log(response.data)
            setMatchedRecipes(response.data)
        })
    }, [])
    const submitIngredient = () => {
         axios.post('http://localhost:3001/api/post', {
            ingredientName: ingredientName
        }).then(() => {
            alert('ingredient sent');
        })
    }
    /*
    //send data to server
    async function submitIngredient(e){
        e.preventDefault();
        try{
            
            await axios.post('http://localhost:3001/api/post',
               { ingredientName: ingredientName });
               //console.log(response);
        }catch(err){
            console.error(err);
        }
    }
    */
    //get data from server
    //useEffect(() => {

    
       

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
                {matchedRecipes.map((val)=>{
                    return(
                        <div>
                            <ul>
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
    /*return( 
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
        
    )*/
    
}

export default Search;