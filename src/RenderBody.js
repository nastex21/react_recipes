import React, { Component } from 'react';
import "./RenderBody.css";
import { FaEdit, FaRegTrashAlt} from 'react-icons/fa';
import v4 from 'uuid';


class RenderRight extends Component {
    constructor(props){
        super(props)

        this.initialRender = this.initialRender.bind(this);
        this.renderRecipe = this.renderRecipe.bind(this);
        this.renderAddedRecipe = this.renderAddedRecipe.bind(this);
        this.helpIdGenerator = this.helpIdGenerator.bind(this);
    }

    helpIdGenerator(){
        return v4()
      }

initialRender(){
    return [
        <h2 id="welcomeText" key={this.helpIdGenerator()}>Welcome to your own personal recipe box!</h2>,
        <h4 id="infoText" key={this.helpIdGenerator()}>Add, delete, edit and store all your favorite recipes! So go on ahead and try it out!</h4>
    ]
}

renderRecipe(){
    return[ 
            <div key={this.helpIdGenerator()} id="recipeContainer">
                <div key={this.helpIdGenerator()} id="recipeName">
                    <h2 key={this.helpIdGenerator()}>{this.props.dish}</h2>
                    <hr className="DishNameHR hrStyle" />
                </div>
                <div key={this.helpIdGenerator()} className="recipeInfo">
                    <div key={this.helpIdGenerator()}  id="servings" className="recipeOutput">
                       <span className="servingsLine servings label">Servings: </span><span className="servingsLine servingsValue value">{this.props.servings}</span>
                    </div>
                    <div key={this.helpIdGenerator()} id="cooking_time" className="recipeOutput">
                         <span className="ctLine cooking label">Cooking Time: </span><span className="ctLine ctValue value"> {this.props.cooking_time}</span>
                    </div> 
                     <div key={this.helpIdGenerator()} id="ingredients" className="recipeOutput">
                        <span className="ingredsLine ingredients label">Ingredients: </span><span className="ingredsLine ingredsValue value"> {this.props.ingredients}</span>
                    </div>
                     <div key={this.helpIdGenerator()} id="directions" className="recipeOutput">
                        <span className="directLine directions label">Directions: </span><span className="directLine directValue value"> {this.props.directions}</span>
                    </div>
                </div>
                <div key={this.helpIdGenerator()} id="buttons">
                    <button onClick={this.props.edit} id="edit"><FaEdit /></button><button onClick={this.props.remove} id="remove"><FaRegTrashAlt /></button>
                </div>
            </div>
    ]
}

renderAddedRecipe(){
return [
                <div key={this.helpIdGenerator()} id="addContainer"> 
                <div key={this.helpIdGenerator()} id="recipeName" className="recipeOutput">
                    <h2 key={this.helpIdGenerator()}>Add Your Dish</h2>
                </div>
                <div key={this.helpIdGenerator()} className="recipeInfo">
                    <div key={this.helpIdGenerator()} id="servings" className="recipeOutput">
                        <span className="label servingsLine">Servings: </span>
                    </div>
                    <div key={this.helpIdGenerator()} id="cooking_time" className="recipeOutput">
                        <span className="label ctLine">Cooking Time: </span>
                    </div>
                    <div key={this.helpIdGenerator()} id="ingredients" className="recipeOutput">
                        <span className="label ingredsLine">Ingredients: </span>
                    </div>
                    <div key={this.helpIdGenerator()} id="directions" className="recipeOutput">
                        <span className="label directLine">Directions: </span>
                    </div>
                </div>
                <div key={this.helpIdGenerator()} id="buttons">
                    <button onClick={this.props.edit} id="edit"><FaEdit /></button><button onClick={this.props.remove} id="remove"><FaRegTrashAlt /></button>
                </div>
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