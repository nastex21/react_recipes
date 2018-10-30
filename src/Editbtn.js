import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class Editbtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            id: "",
            dish: "",
            servings: "",
            cooking_time: "",
            ingredients: "",
            directions: ""
        }
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.save = this.save.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.initialRender = this.initialRender.bind(this);
        this.conditionalRender = this.conditionalRender.bind(this);
  }


      edit(event) {
        this.setState({
            edit:true
        })
    }
    
    remove(){
        this.props.onRemove(this.state.id)
    }

    componentDidUpdate(prevProps, prevState){
       /*  var textArea;
        if(this.state.editing){
            textArea = this._newText;
            textArea.focus();
            textArea.select();
        } */

      console.log(prevState.dish);
      console.log(item);
      console.log(item.servings)
      var item = this.props.value[0];
        if(prevState.dish == undefined){
            return null;
        } else if (prevState.dish == undefined && prevState.dish !== item.dish){
        this.setState({
             id: item.id,
             dish: item.dish,
             servings: item.servings == undefined ? "" : item.servings ,
             cooking_time: item.cooking_time == undefined ? "" : item.cooking_time,
             ingredients: item.ingredients == undefined ? "" : item.ingredients,
             directions: item.directions == undefined ? "" : item.directions
        })
    console.log(this.state.dish) 
    } 
    } 


    save(e){
        e.preventDefault();

        let newRecipe = {
            id: this.state.id,
            dish: this.state.dish,
            servings: this.state.servings,
            cooking_time: this.state.cooking_time,
            ingredients: this.state.ingredients,
            directions: this.state.directions
        }
        this.props.onChange(newRecipe, this.state.id);
        console.log(newRecipe)
        this.setState({
            edit: false
        }) 
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name);
        console.log(value);
    
        this.setState({
          [name]: value
        });

      } 

    renderForm(){
            return[
                <div id="header" className="formOutput">
                    <h2>{this.state.dish}</h2>
                </div>,
                <div id="form" onSubmit={this.save}>
                    <form>
                        <div id="formHeading" className="recipeOutput">
                             <span>Name: </span><input type="text" name="dish" onChange={this.handleInputChange} defaultValue={this.state.dish} /><br />
                        </div>
                        <div id="formServings" className="recipeOutput">
                             <span>Servings: </span><input type="text" name="servings" onChange={this.handleInputChange} defaultValue={this.state.servings} /><br />
                        </div>
                        <div id="formCooking_time" className="recipeOutput">
                            <span>Cooking Time: </span><input type="text" name="cooking_time" onChange={this.handleInputChange} defaultValue={this.state.cooking_time} /><br />
                        </div> 
                        <div id="formIngredients" className="recipeOutput">
                            <span>Ingredients: </span><textarea rows="4" cols="50" name="ingredients" onChange={this.handleInputChange} defaultValue={this.state.ingredients} /><br />
                        </div>
                        <div id="formDirections" className="recipeOutput">
                            <span>Directions: </span><textarea rows="4" cols="50" name="directions" onChange={this.handleInputChange} defaultValue={this.state.directions} /><br />
                        </div>
                        <div id="buttons" className="recipeOutput">
                            <button id="save">SAVE</button>
                        </div> 
                    </form>
                </div>
            ]
            } 

    initialRender(){
        console.log("placeholder")
        return [
            <>
                <p>This is a placeholder.</p>
            </>
        ]
    }

    renderDisplay(){
        var item = this.props.value[0];
        return [
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

    conditionalRender(){
        console.log(this.props.value);
        console.log(this.state.edit)
        console.log(this.props.initialRender);
        console.log(this.props)
       if (this.props.value == "" && this.state.edit == false && this.props.initialRender == true){
            console.log("initialRender");
            return this.initialRender() 
       } else if (this.props.value !== "" && this.state.edit == false){
           console.log("renderDisplay");
            return this.renderDisplay()
       } else if (this.state.edit == true){
            console.log("renderForm");
            return this.renderForm();
       } else {
           return this.initialRender();
       }
    }

    render() {
        console.log("edit is running")
        return( 
        <>
            {this.conditionalRender()}
        </>
        )
    }
}

export default Editbtn;