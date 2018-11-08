import React, { Component } from 'react';
import "./RenderBody.css";
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
        <h2 key={guidGenerator()} id="welcomeText">Welcome to your own personal recipe box!</h2>,
        <h4 key={guidGenerator()} id="">Add, delete, edit and store all your favorite recipes! So go on ahead and try it out!</h4>
    ]
}

renderRecipe(){
    return[ 
                <>
                <div key={this.props.id} id="recipeName">
                    <h2>{this.props.dish}</h2>
                    <hr className="DishNameHR hrStyle" />
                </div>
                <div className="recipeInfo">
                    <div key={this.props.id + 1}  id="servings" className="recipeOutput">
                       <span className="servingsLine servings label">Servings: </span><span className="servingsLine servingsValue value">{this.props.servings}</span>
                    </div>
                    <div key={this.props.id + 2} id="cooking_time" className="recipeOutput">
                         <span className="ctLine cooking label">Cooking Time: </span><span className="ctLine ctValue value"> {this.props.cooking_time}</span>
                    </div> 
                     <div key={this.props.id + 3} id="ingredients" className="recipeOutput">
                        <span className="ingredsLine ingredients label">Ingredients: </span><span className="ingredsLine ingredsValue value"> {this.props.ingredients}</span>
                    </div>
                     <div key={this.props.id + 4} id="directions" className="recipeOutput">
                        <span className="directLine directions label">Directions: </span><span className="directLine directValue value"> {this.props.directions}</span>
                    </div>
                </div>
                <div key={this.props.id + 5} id="buttons">
                    <button onClick={this.props.edit} id="edit"><FaEdit /></button><button onClick={this.props.remove} id="remove"><FaRegTrashAlt /></button>
                </div>
                </>
    ]
}

renderAddedRecipe(){
return [
                <>
                <div id="recipeName" className="recipeOutput">
                    <h2>Add Your Dish</h2>
                </div>
                <div className="recipeInfo">
                    <div id="servings" className="recipeOutput">
                        <span className="label servingsLine">Servings: </span>
                    </div>
                    <div id="cooking_time" className="recipeOutput">
                        <span className="label ctLine">Cooking Time: </span>
                    </div>
                    <div id="ingredients" className="recipeOutput">
                        <span className="label ingredsLine">Ingredients: </span>
                    </div>
                    <div id="directions" className="recipeOutput">
                        <span className="label directLine">Directions: </span>
                    </div>
                </div>
                <div id="buttons">
                    <button onClick={this.props.edit} id="edit"><FaEdit /></button><button onClick={this.props.remove} id="remove"><FaRegTrashAlt /></button>
                </div>
                </>
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