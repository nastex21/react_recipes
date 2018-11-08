import React, { Component } from 'react';
import "./Editform.css";
import { FaSave, FaTimesCircle } from 'react-icons/fa';
import v4 from 'uuid';

class EditForm extends Component {
    constructor(props){
        super(props);
        this.helpIdGenerator = this.helpIdGenerator.bind(this);
    }

cancelBtn(event, id){
        this.props.cancel(event, id);
    }

    helpIdGenerator(){
        return v4()
      }

render(){
    return[
        <div key={this.helpIdGenerator()}  id="header" className="formOutput">
                    <h2 key={this.helpIdGenerator()} >{this.props.dish}</h2>
                </div>,
                <div key={this.helpIdGenerator()} id="form" onSubmit={this.props.save}>
                    <form key={this.helpIdGenerator()} >
                        <div key={this.helpIdGenerator()}  id="formHeading" className="formOutput">
                             <span key={this.helpIdGenerator()} >Name: </span><input key={this.helpIdGenerator()}  type="text" name="dish" onChange={this.props.handleInputChange} defaultValue={this.props.dish} /><br />
                        </div>
                        <div key={this.helpIdGenerator()} id="formServings" className="formOutput">
                             <span key={this.helpIdGenerator()} >Servings: </span><input key={this.helpIdGenerator()}  type="text" name="servings" onChange={this.props.handleInputChange} defaultValue={this.props.servings} /><br />
                        </div>
                        <div key={this.helpIdGenerator()} id="formCooking_time" className="formOutput">
                            <span key={this.helpIdGenerator()} >Cooking Time: </span><input key={this.helpIdGenerator()}  type="text" name="cooking_time" onChange={this.props.handleInputChange} defaultValue={this.props.cooking_time} /><br />
                        </div> 
                        <div key={this.helpIdGenerator()} id="formIngredients" className="formOutput">
                            <span key={this.helpIdGenerator()} >Ingredients: </span><textarea key={this.helpIdGenerator()}  rows="4" cols="50" name="ingredients" onChange={this.props.handleInputChange} defaultValue={this.props.ingredients} /><br />
                        </div>
                        <div key={this.helpIdGenerator()} id="formDirections" className="formOutput">
                            <span key={this.helpIdGenerator()} >Directions: </span><textarea key={this.helpIdGenerator()}  rows="4" cols="50" name="directions" onChange={this.props.handleInputChange} defaultValue={this.props.directions} /><br />
                        </div>
                        <div key={this.helpIdGenerator()} id="formButtons" className="formOutput">
                            <button key={this.helpIdGenerator()}  id="save"><FaSave /></button>
                            <button key={this.helpIdGenerator()} id="cancel" type="button" onClick={this.cancelBtn.bind(this, this.props.id)}><FaTimesCircle key={this.helpIdGenerator()}  /> </button>
                        </div> 
                    </form>
                </div>
    ]
}
}

export default EditForm;