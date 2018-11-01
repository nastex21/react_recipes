import React, { Component } from 'react';

class EditForm extends Component {
constructor(props){
    super(props);
}

render(){
    console.log("works!");
    var item = this.props.value[0];
    console.log(item);
    return[
        <div id="header" className="formOutput">
                    <h2>{item.dish}</h2>
                </div>,
                <div id="form" onSubmit={this.props.save}>
                    <form>
                        <div id="formHeading" className="recipeOutput">
                             <span>Name: </span><input type="text" name="dish" onChange={this.props.handleInputChange} defaultValue={item.dish} /><br />
                        </div>
                        <div id="formServings" className="recipeOutput">
                             <span>Servings: </span><input type="text" name="servings" onChange={this.props.handleInputChange} defaultValue={item.servings} /><br />
                        </div>
                        <div id="formCooking_time" className="recipeOutput">
                            <span>Cooking Time: </span><input type="text" name="cooking_time" onChange={this.props.handleInputChange} defaultValue={item.cooking_time} /><br />
                        </div> 
                        <div id="formIngredients" className="recipeOutput">
                            <span>Ingredients: </span><textarea rows="4" cols="50" name="ingredients" onChange={this.props.handleInputChange} defaultValue={item.ingredients} /><br />
                        </div>
                        <div id="formDirections" className="recipeOutput">
                            <span>Directions: </span><textarea rows="4" cols="50" name="directions" onChange={this.props.handleInputChange} defaultValue={item.directions} /><br />
                        </div>
                        <div id="buttons" className="recipeOutput">
                            <button id="save">SAVE</button>
                        </div> 
                    </form>
                </div>
    ]
}
}

export default EditForm;