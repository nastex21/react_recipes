import React, { Component } from 'react';

class Editbtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
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
/*         this.handleInputChange = this.handleInputChange.bind(this);
 */    }

    edit(){
        this.setState({
            edit:true
        })
    }

    remove(){
        console.log("Editbtn remove is running")
        this.props.onRemove(this.props.index)
    }

    componentDidUpdate(){
        var textArea;
        if(this.state.editing){
            textArea = this._newText;
            textArea.focus();
            textArea.select();
        }
        console.log(this.state.dish);
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
        console.log("save triggered: " + this._newText.value);
        console.log("this.props: " + this.props);
        this.props.onChange(this._newText.value, this.props.index, this.state.dish)
        this.setState({
            edit: false
        }) 
    }
/* 
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

      } */

    renderForm(){
     /*    console.log("this.props " + this) */
        //<input ref={input => this._newText = input} defaultValue={this.props.children[0]} />
        console.log(this.state);

        return (
            <div className="note">
            <form onSubmit={this.save}>
            Dish: 
                 <input name="dish" type="text" ref={input => this._newText = input} defaultValue={this.props.children[0]} onChange={this.handleInputChange}/>
                 <button id="save">SAVE</button>
            </form>
            </div>
        )
    }

    renderDisplay(){
        var self = this;
        return (
            <div className="note">
                {this.props.children.map(function (ele, index){
                return [<p>{ele}</p>, 
                <button id={index} onClick={self.edit}  className="edit">Edit</button>]
                })
                }
                <span>
                    <button onClick={this.remove} id="remove">Remove</button>
                </span>
            </div>
        )
    }

    render() {
        return this.state.edit ? this.renderForm() : this.renderDisplay();
    }
}

export default Editbtn;