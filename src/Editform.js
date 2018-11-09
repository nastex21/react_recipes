import React, { Component } from 'react';
import "./Editform.css";
import { FaSave, FaTimesCircle } from 'react-icons/fa';

class EditForm extends Component {

cancelBtn(event, id){
        this.props.cancel(event, id);
    }

render(){
    return[
                <div key={this.props.id} id="header" className="formOutput">
                    <h2>{this.props.dish}</h2>
                </div>,
                <div key={this.props.id + this.props.dish[0]} id="form" onSubmit={this.props.save}>
                    <form >
                        <div id="formHeading" className="formOutput">
                             <span>Name: </span><input type="text" name="dish" onChange={this.props.handleInputChange} defaultValue={this.props.dish} /><br />
                        </div>
                        <div  id="formServings" className="formOutput">
                             <span>Servings: </span><input  type="text" name="servings" onChange={this.props.handleInputChange} defaultValue={this.props.servings} /><br />
                        </div>
                        <div  id="formCooking_time" className="formOutput">
                            <span>Cooking Time: </span><input  type="text" name="cooking_time" onChange={this.props.handleInputChange} defaultValue={this.props.cooking_time} /><br />
                        </div> 
                        <div  id="formIngredients" className="formOutput">
                            <span>Ingredients: </span><textarea  rows="4" cols="50" name="ingredients" onChange={this.props.handleInputChange} defaultValue={this.props.ingredients} /><br />
                        </div>
                        <div  key={this.props.id + this.props.dish[1] + this.props.id} id="formDirections" className="formOutput">
                            <span>Directions: </span><textarea  rows="4" cols="50" name="directions" onChange={this.props.handleInputChange} defaultValue={this.props.directions} /><br />
                        </div>
                        <div  id="formButtons" className="formOutput">
                            <button id="save"><FaSave /></button>
                            <button id="cancel" type="button" onClick={this.cancelBtn.bind(this, this.props.id)}><FaTimesCircle /> </button>
                        </div> 
                    </form>
                </div>
    ]
}
}

export default EditForm;