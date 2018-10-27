import React, { Component } from 'react';

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
        console.log("Editbtn remove is running")
        this.props.onRemove(this.props.index)
    }

    componentDidUpdate(prevProps, prevState){
        var textArea;
        if(this.state.editing){
            textArea = this._newText;
            textArea.focus();
            textArea.select();
        }
        console.log(prevProps);
        console.log(prevState);
       if(!prevState.edit){
        console.log("running")
        this.setState({
             id: prevProps.children[0],
             dish: prevProps.children[1],
             servings: prevProps.children[2],
             cooking_time: prevProps.children[3],
             ingredients: prevProps.children[4],
             directions: prevProps.children[5]
        }) 
    }
    console.log(this.state.cooking_time);
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps);
        console.log(nextState);
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )

    }

    save(e){
        e.preventDefault();
        console.log(this.state.servings)
        console.log("this.props: " + this.props);
        let newRecipe = {
            id: this.state.id,
            dish: this.state.dish,
            servings: this.state.servings,
            cooking_time: this.state.cooking_time,
            ingredients: this.state.ingredients,
            directions: this.state.directions
        }
        console.log(this.state.id, this.state.dish, this.state.servings, this.state.cooking_time, this.state.ingredients, this.state.directions)
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
        console.log("target: " + target);
        console.log("value: " + value);
        console.log("name: " + name);
    
        this.setState({
          [name]: value
        });

      } 

    renderForm(){
        //<input ref={input => this._newText = input} defaultValue={this.props.children[0]} />
        /*<input type="text" ref={input => this._newText = input} onChange={this.handleInputChange} />
                     <button id="save">SAVE</button>*/
        console.log(this.state);

            var elements = [];
            var items = this.props.values;
            Object.entries(items).forEach((item, index) => {
                let key = item[0];
                let value = item[1];
                console.log(key);
                const capitalize = (s) => {
                        if (typeof s !== 'string') return ''
                        return s.charAt(0).toUpperCase() + s.slice(1)
                }
                elements.push(<>
                        {key !== "dish" & key !== "id" ? key == "cooking_time" ? <>Cooking Time: <input type="text" name="cooking_time" onChange={this.handleInputChange} defaultValue={value} /><br /></> : <>{capitalize(key)}: <input type="text" name={key} onChange={this.handleInputChange} defaultValue={value} /><br /></>: null}
                </>
                )
            });
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
                elements.push(<div>
                    {key === "dish" && value === "New Recipe" ? console.log("yep") : key === "dish" ? <div id={index}><h2>{value}</h2></div> : key === "cooking_time" ? <div id ={index}><p>Cooking Time: {value}</p></div> : <div id={index}><p>{capitalize(key)}: {value}</p></div>}</div> 
                )
            }
        })
        return <div className="recipe-box">{elements}<button onClick={this.edit} id="edit">Edit</button><button onClick={this.remove} id="remove">Remove</button></div>;
    }

    render() {
        return this.state.edit ? this.renderForm() : this.renderDisplay();
    }
}

export default Editbtn;