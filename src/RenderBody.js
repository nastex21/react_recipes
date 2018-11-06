import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";
import { FaEdit, FaRegTrashAlt} from 'react-icons/fa';


class RenderRight extends Component {
    constructor(props){
        super(props)

        this.initialRender = this.initialRender.bind(this);
        this.renderRecipe = this.renderRecipe.bind(this);
        this.renderAddedRecipe = this.renderAddedRecipe.bind(this);
    }

initialRender(){
    return [
        <p key={guidGenerator()}>This is a placeholder.</p>
    ]
}

renderRecipe(){
    return[
                <div key={this.props.id} id="recipeName" className="recipeOutput">
                    <h2>{this.props.dish}</h2>
                </div>,
                <div key={this.props.id + 1}  id="servings" className="recipeOutput">
                    <p>Servings: {this.props.servings}</p>
                </div>,
                <div key={this.props.id + 2} id="cooking_time" className="recipeOutput">
                    <p>Cooking Time: {this.props.cooking_time}</p>
                </div>, 
                <div key={this.props.id + 3} id="ingredients" className="recipeOutput">
                    <p>Ingredients: {this.props.ingredients}</p>
                </div>,
                <div key={this.props.id + 4} id="directions" className="recipeOutput">
                    <p>Directions: {this.props.directions}</p>
                </div>,
                <div key={this.props.id + 5} id="buttons" className="recipeOutput">
                    <button onClick={this.props.edit} id="edit"><FaEdit /></button><button onClick={this.props.remove} id="remove"><FaRegTrashAlt /></button>
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
                    <button onClick={this.props.edit} id="edit"><FaEdit /></button><button onClick={this.props.remove} id="remove"><FaRegTrashAlt /></button>
                </div>
]
}

render(){
    return (
        <>
        {this.props.initialRender === true ? this.initialRender() : this.props.recipeRender === true ? this.renderRecipe() : this.props.addRecipe === true ? this.renderAddedRecipe() : this.props.search === true ? this.renderRecipe() : null}
        </>
    )
}
}

export default RenderRight;