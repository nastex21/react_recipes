import React, { Component } from 'react';
import Select from 'react-select';

class SearchResults extends Component { 
    constructor(props){
        super(props);
        this.state = {
            recipes: []
        }
    }

componentDidMount(){
    var buildObject = this.props.values.map(recipe => ({
        label: recipe.dish,
        value: recipe.id
    }))

    this.setState({
        recipes: [...buildObject]
    })  
}

render(){
    console.log(this.state.recipes)
    return(
        <div className="app">
          <div className="container">
            <Select options={ this.state.recipes }  onChange={opt => this.props.userSelection(opt.label, opt.value)} onFocus={this.props.focus} />
          </div>
        </div>
          )
}
};

export default SearchResults;
