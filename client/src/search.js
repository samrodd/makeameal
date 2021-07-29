import React from "react"
import Recommendation from "./Recommendation"
import Results from "./Results"

class Search extends React.Component{
    constructor(){
        super()
        this.state = {
            firstIngredient: "",
            secondIngredient: "",
            thirdIngredient: "",
            fourthIngredient: "",
            fifthIngredient: "",
            sixthIngredient: "",
            seventhIngredient: "",
            eighthIngredient: "",
            recipes: [],
            inputCount: 0,
            doesRecipesGet: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
       
    }

    handleSubmit(event){
        event.preventDefault()
        const inputedIngredients = []
        if(this.state.firstIngredient !== ""){ inputedIngredients.push(this.state.firstIngredient.toLocaleLowerCase()) }
        if(this.state.secondIngredient !== ""){ inputedIngredients.push(this.state.secondIngredient.toLocaleLowerCase()) }
        if(this.state.thirdIngredient !== ""){ inputedIngredients.push(this.state.thirdIngredient.toLocaleLowerCase()) }
        if(this.state.fourthIngredient !== ""){ inputedIngredients.push(this.state.fourthIngredient.toLocaleLowerCase()) }
        if(this.state.fifthIngredient !== ""){ inputedIngredients.push(this.state.fifthIngredient.toLocaleLowerCase()) }
        if(this.state.sixthIngredient !== ""){ inputedIngredients.push(this.state.sixthIngredient.toLocaleLowerCase()) }
        if(this.state.seventhIngredient !== ""){ inputedIngredients.push(this.state.seventhIngredient.toLocaleLowerCase()) }
        if(this.state.eighthIngredient !== ""){ inputedIngredients.push(this.state.eighthIngredient.toLocaleLowerCase()) }
        
        console.log(inputedIngredients.length)
        this.setState({ inputCount: inputedIngredients.length})
        fetch("http://localhost:3001/api/post", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                inputIngredients: inputedIngredients

            })
        })
        .then(response => response.json())
        .then(response => {
           this.setState({
               recipes: response,
               doesRecipesGet: true
           })
        })
        

    }
    handleChange(event){
        console.log(event.target)
        this.setState({
            [event.target.name] : event.target.value
            
        })
    }
    
    render(){
        
        return(
            <div>
            
            <form className = "input-form" onSubmit={this.handleSubmit}>
            <div className = "input-container">
            <h2 className = "input-title">Please enter ingredients of your choice</h2>
                <input 
                    placeholder="1..."
                    type="text"
                    name="firstIngredient"
                    value={this.state.firstIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="2..."
                    type="text"
                    name="secondIngredient"
                    value={this.state.secondIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="3..."
                    type="text"
                    name="thirdIngredient"
                    value={this.state.thirdIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="4..."
                    type="text"
                    name="fourthIngredient"
                    value={this.state.fourthIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="5..."
                    type="text"
                    name="fifthIngredient"
                    value={this.state.fifthIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="6..."
                    type="text"
                    name="sixthIngredient" //
                    value={this.state.sixthIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="7..."
                    type="text"
                    name="seventhIngredient"
                    value={this.state.seventhIngredient}
                    onChange={this.handleChange}
                />
                <input 
                    placeholder="8..."
                    type="text"
                    name="eighthIngredient"
                    value={this.state.eighthIngredient}
                    onChange={this.handleChange}
                />
                <button className = "input-button">Submit</button>
                </div>
                
            </form>
            <div className="result-your-entered">
                
                <h2>Your ingredients</h2>
                <p>
                {this.state.firstIngredient}
                {' '}
                {this.state.secondIngredient}
                {' '}
                {this.state.thirdIngredient}
                {' '}
                {this.state.fourthIngredient}
                {' '}
                {this.state.fifthIngredient}
                {' '}
                {this.state.sixthIngredient}
                {' '}
                {this.state.seventhIngredient}
                {' '}
                {this.state.eighthIngredient}
                </p>
            </div>
            <div className="result-recipes">
           
            <div className="result-exact">
                <Results recipes={this.state.recipes} count={this.state.inputCount} doesRecipesGet={this.state.doesRecipesGet}/>
            </div>
            <div className="result-recommendation">
                <Recommendation recipes={this.state.recipes} count={this.state.inputCount} doesRecipesGet={this.state.doesRecipesGet}/>
            </div>
            </div>
            </div>
        )
    }
}

export default Search

