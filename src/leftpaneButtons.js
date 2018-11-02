import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class LeftPaneButtons extends Component {
    constructor(props){
        super(props);
        this.renderInitial = this.renderInitial.bind(this);
    }

    renderInitial(){
        console.log(this.props);
        var dishesValues = this.props.values;
        console.log(dishesValues)
        var elements = [];
        dishesValues.forEach((item, index) => {
            console.log(item);
            elements.push(<div key={item.id} className="recipeNames"><input type="button" defaultValue={item.dish} value={item.id} onClick={this.props.recipeBtns} /></div>)
            
        })
        return elements;
    }

    render(){
        console.log(this.props);
        return this.renderInitial();
    }
}

export default LeftPaneButtons;