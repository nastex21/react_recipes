import React, { Component } from 'react';

class InitialRecipes extends Component {
    constructor(props){
        super(props);
        this.renderInitial = this.renderInitial.bind(this);
    }

    renderInitial(){
        var dishesValues = this.props.values;
        var elements = [];
        dishesValues.forEach((item, index) => {
            console.log(item);
            elements.push(<div key={index} className="recipeNames"><input type="button" defaultValue={item.dish} /></div>)
            
        })
        return elements;
    }

    render(){
        return this.renderInitial();
    }
}

export default InitialRecipes;