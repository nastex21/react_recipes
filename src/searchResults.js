import React, { Component } from 'react';
import Select from 'react-select';

class SearchResults extends Component { 
    constructor(props){
        super(props);
        this.state = {
            recipes: [],
            recipe:  []
        }
    }

componentDidUpdate(prevState){
    var buildObject = this.props.values.map(recipe => ({
        label: recipe.dish,
        value: recipe.id
    }))
    console.log(prevState.values.length)
    console.log(this.state.recipes.length)
  if(prevState.values.length !== this.state.recipes.length && this.state.recipes.length !== 0){
    this.setState({
        recipe: [...this.props.values]
    })  
  } else if (this.state.recipes.length == 0) {
    this.setState({
        recipes: [...buildObject]
    })  
  }
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
