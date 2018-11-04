import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class RenderRight extends Component {
    constructor(props){
        super(props)

        this.initialRender = this.initialRender.bind(this);
        this.renderRecipe = this.renderRecipe.bind(this);
        this.renderAddedRecipe = this.renderAddedRecipe.bind(this);
    }

initialRender(){
    return [
        <p key={guidGenerator}>This is a placeholder.</p>
    ]
}

renderRecipe(){
    return[
                <div id="recipeName" className="recipeOutput">
                    <h2>{this.props.dish}</h2>
                </div>,
                <div id="servings" className="recipeOutput">
                    <p>Servings: {this.props.servings}</p>
                </div>,
                <div id="cooking_time" className="recipeOutput">
                    <p>Cooking Time: {this.props.cooking_time}</p>
                </div>, 
                <div id="ingredients" className="recipeOutput">
                    <p>Ingredients: {this.props.ingredients}</p>
                </div>,
                <div id="directions" className="recipeOutput">
                    <p>Directions: {this.props.directions}</p>
                </div>,
                <div id="buttons" className="recipeOutput">
                    <button onClick={this.props.edit} id="edit">Edit</button><button onClick={this.props.remove} id="remove">Remove</button>
                </div>
    ]
}

renderAddedRecipe(){
return [
                <div id="recipeName" className="recipeOutput">
                    <h2>Add Your Dish</h2>
                </div>,
                <div id="servings" className="recipeOutput">
                    <p>Servings: </p>
                </div>,
                <div id="cooking_time" className="recipeOutput">
                    <p>Cooking Time:</p>
                </div>, 
                <div id="ingredients" className="recipeOutput">
                    <p>Ingredients: </p>
                </div>,
                <div id="directions" className="recipeOutput">
                    <p>Directions: </p>
                </div>,
                <div id="buttons" className="recipeOutput">
                    <button onClick={this.props.edit} id="edit">Edit</button><button onClick={this.props.remove} id="remove">Remove</button>
                </div>
]
}

render(){
    console.log(this.props.search)
    return (
        <>
        {this.props.initialRender == true ? this.initialRender() : this.props.recipeRender == true ? this.renderRecipe() : this.props.addRecipe == true ? this.renderAddedRecipe() : this.props.search == true ? this.renderRecipe() : null}
        </>
    )
}
}

export default RenderRight;