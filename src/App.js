import React, { Component } from 'react';
import './App.css';
import Editbtn from './Editbtn';
import LeftPaneButtons from "./leftpaneButtons";
import SearchResults from "./searchResults";
import RenderBody from "./RenderBody";
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      search: "",
      buttonRender: false,
      buttonValue: []
    }
    this.localSetState = this.localSetState.bind(this);
    this.changeButtonState = this.changeButtonState.bind(this);
  }

  componentWillMount(){
    //localStorage.clear();
    let getData = localStorage.getItem('getRecipes');
    let initialArr = [{
      id: 0,
      dish: "Hamburger",
      servings: 4,
      cooking_time: "10 minutes",
      ingredients: "Bread, ground beef, lettuce, tomatoes and condiments",
      directions: "Toast bread, grill meat, cut up lettuce and tomotoes"
    },
    { id: 1,
      dish: "Pizza",
      servings: 4,
      cooking_time: "30 minutes",
      ingredients: "Flour, tomato sauce, pepperoni, cheese",
      directions: "Make crust, add tomato sauce and pepperoni and cheese"
    }
  ]
    getData === null ? this.setState({recipes: [...this.state.recipes, ...initialArr]}) : this.localSetState();
  }

  componentDidUpdate(prevProps, prevState){
    localStorage.setItem('getRecipes', JSON.stringify(this.state.recipes));
    console.log(this.state.buttonValue)
    console.log(prevProps);
    console.log(prevState);
  }

/*   shouldComponentUpdate(nextProps, nextState){
    console.log(this.state.buttonValue)
    console.log(nextProps);
    console.log(nextState);
    /* return (
        this.props.children !== nextProps.children || this.state !== nextState
    ) }*/


  localSetState(){
    let getData = JSON.parse(localStorage.getItem('getRecipes'));
    this.setState({
      recipes: [...this.state.recipes, ...getData]
    })
  }

  changeButtonState(event){
    console.log(event.target.value);
    if (this.state.buttonRender == false){
      this.setState({
        buttonRender: true
      })
    }

    var value = this.state.recipes.filter(item => item.dish == event.target.value);

    this.setState({
        buttonValue: [...value]
      })

   console.log(this.state.buttonValue)

  }

  render() {
    return [
      <div id="left-pane">
        <div id="search">
           <input onChange={this.search} />
        </div>
        <div id="results">
        {this.state.search == "" ? <LeftPaneButtons values={this.state.recipes} changeButtons={this.changeButtonState} /> : <SearchResults /> }
        </div>
      </div>,
      <div id="recipes-body">
          <Editbtn value={this.state.buttonValue}/>
      </div> 
    ]
  }
}

export default App;