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
/*         this.renderForm = this.renderForm.bind(this);
 */        this.renderDisplay = this.renderDisplay.bind(this);
        this.save = this.save.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.initialRender = this.initialRender.bind(this);
        console.log("running editbtn!!!!!!!!")
  }


      edit(event) {
        this.setState({
            edit:true
        })
    }
    
    remove(){
        this.props.onRemove(this.props.index)
    }

    /* componentDidUpdate(prevProps, prevState){
        var textArea;
        if(this.state.editing){
            textArea = this._newText;
            textArea.focus();
            textArea.select();
        }

       if(!prevState.edit){
        this.setState({
             id: prevProps.children[0],
             dish: prevProps.children[1],
             servings: prevProps.children[2],
             cooking_time: prevProps.children[3],
             ingredients: prevProps.children[4],
             directions: prevProps.children[5]
        }) 
    }
    } */

/*     shouldComponentUpdate(nextProps, nextState){

        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )

    } */

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
        this.setState({
            edit: false,
            id: "",
            dish: "",
            servings: "",
            cooking_time: "",
            ingredients: "",
            directions: ""
        }) 
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(value);
    
        this.setState({
          [name]: value
        });

      } 

    renderForm(){
        var item = this.props.value[0];

            return[
                <div id="header" className="formOutput">
                    <h2>{item.dish}</h2>
                </div>,
                <div id="form" onSubmit={this.save}>
                    <form>
                        <div id="formHeading" className="recipeOutput">
                             <span>Name: </span><input type="text" name="servings" onChange={this.handleInputChange} defaultValue={item.dish} /><br />
                        </div>
                        <div id="formServings" className="recipeOutput">
                             <span>Servings: </span><input type="text" name="servings" onChange={this.handleInputChange} defaultValue={item.servings} /><br />
                        </div>
                        <div id="formCooking_time" className="recipeOutput">
                            <span>Cooking Time: </span><input type="text" name="cooking_time" onChange={this.handleInputChange} defaultValue={item.cooking_time} /><br />
                        </div> 
                        <div id="formIngredients" className="recipeOutput">
                            <span>Ingredients: </span><textarea rows="4" cols="50" name="ingredients" onChange={this.handleInputChange} defaultValue={item.ingredients} /><br />
                        </div>
                        <div id="formDirections" className="recipeOutput">
                            <span>Directions: </span><textarea rows="4" cols="50" name="directions" onChange={this.handleInputChange} defaultValue={item.directions} /><br />
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
                    <h2>{item.dish}</h2>
                </div>,
                <div id="servings" className="recipeOutput">
                    <p>Servings: {item.servings}</p>
                </div>,
                <div id="cooking_time" className="recipeOutput">
                    <p>Cooking Time: {item.cooking_time}</p>
                </div>, 
                <div id="ingredients" className="recipeOutput">
                    <p>Ingredients: {item.ingredients}</p>
                </div>,
                <div id="directions" className="recipeOutput">
                    <p>Directions: {item.directions}</p>
                </div>,
                <div id="buttons" className="recipeOutput">
                    <button onClick={this.edit} id="edit">Edit</button><button onClick={this.remove} id="remove">Remove</button>
                </div>
        ]
    }

    render() {
        console.log("edit btn initiated")
        return( 
        <>
        {this.props.value == "" && this.state.edit == false ? this.initialRender() : this.props.value !== "" && this.state.edit == false ? this.renderDisplay() : this.state.edit == true ? this.renderForm() : null}
        </>
        )
    }
}

export default Editbtn;