import React, { Component } from 'react';
import { FaSave, FaTimesCircle } from 'react-icons/fa';

class EditForm extends Component {

cancelBtn(event, id){
        this.props.cancel(event, id);
    }

render(){
    return[
        <div id="header" className="formOutput">
                    <h2>{this.props.dish}</h2>
                </div>,
                <div id="form" onSubmit={this.props.save}>
                    <form >
                        <div id="formHeading" className="recipeOutput">
                             <span>Name: </span><input type="text" name="dish" onChange={this.props.handleInputChange} defaultValue={this.props.dish} /><br />
                        </div>
                        <div  id="formServings" className="recipeOutput">
                             <span>Servings: </span><input  type="text" name="servings" onChange={this.props.handleInputChange} defaultValue={this.props.servings} /><br />
                        </div>
                        <div  id="formCooking_time" className="recipeOutput">
                            <span>Cooking Time: </span><input  type="text" name="cooking_time" onChange={this.props.handleInputChange} defaultValue={this.props.cooking_time} /><br />
                        </div> 
                        <div  id="formIngredients" className="recipeOutput">
                            <span>Ingredients: </span><textarea  rows="4" cols="50" name="ingredients" onChange={this.props.handleInputChange} defaultValue={this.props.ingredients} /><br />
                        </div>
                        <div  id="formDirections" className="recipeOutput">
                            <span>Directions: </span><textarea  rows="4" cols="50" name="directions" onChange={this.props.handleInputChange} defaultValue={this.props.directions} /><br />
                        </div>
                        <div  id="buttons" className="recipeOutput">
                            <button id="save"><FaSave /></button>
                            <button id="cancel" type="button" onClick={this.cancelBtn.bind(this, this.props.id)}><FaTimesCircle /> </button>
                        </div> 
                    </form>
                </div>
    ]
}
}

export default EditForm;