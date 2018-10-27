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
  }


      edit(event) {
        this.setState({
            edit:true
        })
    }
    
    remove(){
        this.props.onRemove(this.props.index)
    }

    componentDidUpdate(prevProps, prevState){
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
    }

    shouldComponentUpdate(nextProps, nextState){

        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )

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
            var elements = [];
            var items = this.props.values;
            var keyId = "";

            Object.entries(items).forEach((item, index) => {
                let key = item[0];
                let value = item[1];            

                if (keyId == ""){
                    if(key == "id"){
                        keyId = value;
                    }
                }
                
                const capitalize = (s) => {
                        if (typeof s !== 'string') return ''
                        return s.charAt(0).toUpperCase() + s.slice(1)
                }
              if(key !== "id"){
                if (key == "cooking_time"){
                    elements.push(<div key={key + keyId + index}><span>Cooking Time: </span> <input type="text" name="cooking_time" onChange={this.handleInputChange} defaultValue={value} /><br /></div>)
                } else if (key == "directions" || key == "ingredients"){
                    elements.push(<div key={key + keyId + index}><span>{capitalize(key)}: </span> <textarea name={key} rows="4" cols="50" onChange={this.handleInputChange} defaultValue={value} /></div>)
                }  else {
                    elements.push(<div key={key + keyId + index}><span>{capitalize(key)}: </span> <input type="text" name={key} onChange={this.handleInputChange} defaultValue={value} /><br /></div>)
                }
            }      
            })
            return <div className="note"><h2>{this.state.dish}</h2><form onSubmit={this.save}>{elements}
            <button id="save">SAVE</button></form></div>;
            }


    renderDisplay(){
        var elements = [];
        var items = this.props.values;
        Object.entries(items).forEach((item, index) => {
            let key = item[0];
            let value = item[1];
            if (key !== "id"){
                const capitalize = (s) => {
                    if (typeof s !== 'string') return ''
                    return s.charAt(0).toUpperCase() + s.slice(1)
                  }
                elements.push(<div key={guidGenerator()} >
                    {key === "dish" && value === "New Recipe" ? console.log("yep") : key === "dish" ? <div id={index} ><h2>{value}</h2></div> : key === "cooking_time" ? <div id ={index} ><p>Cooking Time: {value}</p></div> : <div id={index} ><p>{capitalize(key)}: {value}</p></div>}</div> 
                )
            }
        })
        return <div className="recipe-box" >{elements}<button onClick={this.edit} id="edit">Edit</button><button onClick={this.remove} id="remove">Remove</button></div>;
    }

    render() {
        return this.state.edit ? this.renderForm() : this.renderDisplay();
    }
}

export default Editbtn;