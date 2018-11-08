import React, { Component } from 'react';
import "./leftPane.css";
import v4 from 'uuid';

class LeftPaneButtons extends Component {
    constructor(props){
        super(props);
        this.renderInitial = this.renderInitial.bind(this);
        this.helpIdGenerator = this.helpIdGenerator.bind(this);
    }

    sendToBtns(event, id){
        this.props.recipeBtns(event, id);
    }

    helpIdGenerator(){
        return v4()
      }

    renderInitial(){
        var dishesValues = this.props.values;
        var elements = [];
        dishesValues.forEach((item, index) => { 
            elements.push(<div key={this.helpIdGenerator()} className="recipeNames"><button className="recipeBtn" key={this.helpIdGenerator()}  type="button" defaultValue={item.dish}  onClick={this.sendToBtns.bind(this, item.id)}><p key={this.helpIdGenerator()} id="textContainer"><span key={this.helpIdGenerator()} id="dishText">{item.dish}</span></p></button></div>)
        })
        return elements;
    }

    render(){
        return this.renderInitial();
    }
}

export default LeftPaneButtons;