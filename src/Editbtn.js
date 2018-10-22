import React, { Component } from 'react';

class Editbtn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        }
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.save = this.save.bind(this);
    }

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
    }

    shouldComponentUpdate(nextProps, nextState){
        return (
            this.props.children !== nextProps.children || this.state !== nextState
        )
    }

    save(e){
        e.preventDefault();
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            edit: false
        }) 
    }

    renderForm(){
        console.log("this.props " + this.props.children)
        return (
            <div className="note">
            <form onSubmit={this.save}>
                <textarea ref={input => this._newText = input} defaultValue={this.props.children} />
                <button id="save">Save</button>
            </form>
            </div>
        )
    }

    renderDisplay(){
        return (
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} id="edit">Edit</button>
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