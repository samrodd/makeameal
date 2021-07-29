import React from "react"

function Recommendation(props){
    
    const allRecipes = props.recipes
    const exactCount = [];
    const recommendation = [];
    for(let i = 0; i < allRecipes.length; i++){
        if(allRecipes[i].ingredient_count === props.count){
            exactCount.push(allRecipes[i])
        }
        else{
            recommendation.push(allRecipes[i])
        }
    }

    
    
    
    return(
        /*
        <div>
        <h3>Our Recommendation:</h3>
        {recommendation.map( val => {
            return(
                <ul key={val.id}>
                    <li>{val.title}</li>
                    <li>{val.ingredients}</li>
                    <li>{val.directions}</li>
                    <li>{val.ingredients_string}</li>
                </ul>
                
            )
        })}
        </div>
        */
       <div>
        {props.doesRecipesGet? <h1>Our recommendations</h1> : null}
       {recommendation.map((val)=>{
            return(
                <div key = {val.id}>
                    <div className="card">
                        <div className="header">
                                <div className="icon">
                                    <a href="#"><i className="fa fa-heart-o"></i></a>
                                </div>
                        </div>
                        <div className="text">
                            <h2 className="food">{val.title}</h2>
                                <i className="fa fa-clock-o">15 Mins</i>
                                <i className="fa fa-users">Serves 2</i>
                                <p className="info-1"><em>You will need: </em>{val.ingredients}</p>
                                <p className="info-2"><em>Directions: </em>{val.directions}</p>
                                <p className="info-2"><em>Ingredients: </em>{val.ingredients_string}</p>
                        </div>
                    </div>                   
                </div>
                )
        })}
        </div>
    )
}


export default Recommendation