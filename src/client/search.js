import "./App.css";
import axios from "axios";
import {useState, useEffect} from "react";
import './search.css'

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
                <label>Search Bar </label>
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
                            <div className="card">
                                <div className="header">
                                    <div className="icon">
                                        <a href="#"><i className="fa fa-heart-o"></i>
                                        </a>
                                    </div>
                                </div>
                                <div className="text">
                                    <h2 className="food">
                                        {val.title}
                                    </h2>
                                    <i class="fa fa-clock-o">15 Mins</i>
                                    <i class="fa fa-users">Serves 2</i>

                                    <p className="info"><em>You will need: </em>{val.ingredients}</p>
                                    <p className="info"><em>Directions: </em>{val.directions}</p>
                                </div>
                            </div>
                            <ul>
                                
                              
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
