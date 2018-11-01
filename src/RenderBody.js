import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class RenderRight extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.initialRender = this.initialRender.bind(this);
        this.renderRecipe = this.renderRecipe.bind(this);
    }

initialRender(){
    return [
        <p>This is a placeholder.</p>
    ]
}

renderRecipe(){
console.log(this.props.value)
    return[
        <div id="dish" className="recipeOutput">
                    <h2>{this.state.dish}</h2>
                </div>,
                <div id="servings" className="recipeOutput">
                    <p>Servings: {this.state.servings}</p>
                </div>,
                <div id="cooking_time" className="recipeOutput">
                    <p>Cooking Time: {this.state.cooking_time}</p>
                </div>, 
                <div id="ingredients" className="recipeOutput">
                    <p>Ingredients: {this.state.ingredients}</p>
                </div>,
                <div id="directions" className="recipeOutput">
                    <p>Directions: {this.state.directions}</p>
                </div>,
                <div id="buttons" className="recipeOutput">
                    <button onClick={this.edit} id="edit">Edit</button><button onClick={this.remove} id="remove">Remove</button>
                </div>
    ]
}

render(){
    console.log(this.props.initialRender);
    return (
        <>
        {this.props.initialRender == true ? this.initialRender() : this.props.recipeRender == true ? this.renderRecipe() : null}
        </>
    )
}
}

export default RenderRight;