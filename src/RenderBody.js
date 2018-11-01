import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class RenderRight extends Component {
    constructor(props){
        super(props)
        this.state = {
            edit: false
        }
        this.initialRender = this.initialRender.bind(this);
        this.renderRecipe = this.renderRecipe.bind(this);
        this.renderAddedRecipe = this.renderAddedRecipe.bind(this);
        this.edit = this.edit.bind(this);
    }

initialRender(){
    return [
        <p>This is a placeholder.</p>
    ]
}

renderRecipe(){
    return[
                <div id="dish" className="recipeOutput">
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
                    <button onClick={this.edit} id="edit">Edit</button><button onClick={this.remove} id="remove">Remove</button>
                </div>
    ]
}

renderAddedRecipe(){
return [
                <div id="dish" className="recipeOutput">
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
                    <button onClick={this.edit} id="edit">Edit</button><button onClick={this.remove} id="remove">Remove</button>
                </div>
]
}

edit(){
    this.setState({
        edit: true
    })

    this.props.resetStates();
}

render(){
    console.log(this.props.initialRender);
    console.log(this.props.recipeRender);
    console.log(this.props.addRecipe);
    return (
        <>
        {this.props.initialRender == true ? this.initialRender() : this.props.recipeRender == true ? this.renderRecipe() : this.props.addRecipe == true ? this.renderAddedRecipe() : this.state.edit == true ? this.props.editThis():  null}
        </>
    )
}
}

export default RenderRight;