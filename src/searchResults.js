import React, { Component } from 'react';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.renderInitial = this.renderInitial.bind(this);
    }

    sendToBtns(event, id){
        this.props.recipeBtns(event, id);
    }

    renderInitial(){
        var dishesValues = this.props.value;
        console.log(dishesValues);
       /*  var elements = [];
        dishesValues.forEach((item, index) => { 
            elements.push(<div key={item.id} className="recipeNames"><input type="button" defaultValue={item.dish} value={item.dish} onClick={this.sendToBtns.bind(this, item.id)} /></div>)
            
        })
        return elements; */
        return <p>{dishesValues}</p>
      
    }

    render(){
        return this.renderInitial();
    }
}

export default SearchResults;