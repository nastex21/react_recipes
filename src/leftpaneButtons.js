import React, { Component } from 'react';

class LeftPaneButtons extends Component {
    constructor(props){
        super(props);
        this.renderInitial = this.renderInitial.bind(this);
    }

    sendToBtns(event, id){
        this.props.recipeBtns(event, id);
    }

    renderInitial(){
        var dishesValues = this.props.values;
        var elements = [];
        dishesValues.forEach((item, index) => { 
            elements.push(<div key={item.id + item.dish[0]} className="recipeNames"><input key={index + item.dish[0]} type="button" defaultValue={item.dish}  onClick={this.sendToBtns.bind(this, item.id)} /></div>)
            
        })
        return elements;
    }

    render(){
        return this.renderInitial();
    }
}

export default LeftPaneButtons;