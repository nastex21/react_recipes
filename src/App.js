import React, { Component } from 'react';
import './App.css';
import LeftPaneButtons from "./leftpaneButtons"; 
import SearchResults from "./searchResults"; 
import RenderRight from "./RenderBody"; 
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialRender: true, //what to render when app is first loaded
      recipeRender: false, //render recipe 
      editForm: false, // render edit form when edit button is clicked
      recipes: [], //hold recipe collection
      recipeHolder: [], //hold single recipe to render
      search: "" //hold search value
    }

    this.recipeBtn = this.recipeBtn.bind(this);
    //onClick={this.add.bind(null, "Next Note")} goes in button Add
    //onChange={this.search} goes in input
  }

  componentWillMount(){
    //localStorage.clear();
    let getData = localStorage.getItem('getRecipes');

    //used to create template recipes and store in client's computer
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
    //if getData is empty then run the initialArr variable to fill it or run the fuction localState if it's not null
    getData === null ? this.setState({recipes: [...this.state.recipes, ...initialArr]}) : this.localSetState();
  }

  componentDidUpdate(prevProps, prevState){
    //set the local recipes that are stored
    localStorage.setItem('getRecipes', JSON.stringify(this.state.recipes));
    console.log(this.state.buttonValue)
    }

  //localSetState is ran when getData has actual data and used to populate the recipes array
  localSetState(){
      let getData = JSON.parse(localStorage.getItem('getRecipes'));
      this.setState({
        recipes: [...this.state.recipes, ...getData]
      })
    }

    //if recipe button is pressed, run this
  recipeBtn(event){
      var value = this.state.recipes.filter(item => item.dish == event.target.value);
  
      this.setState({
          recipeHolder: [...value],
          initialRender: false,
          recipeRender: true,
          editForm: false
        })
  }

  render(){
  console.log(this.state.search);

   return [
      <div id="left-pane">
        <div id="search">
            <h2>Dishes</h2>
            <input  />
            <button >Add</button>
        </div>
        <div id="results">
        {this.state.search == "" ? <LeftPaneButtons values={this.state.recipes} recipeBtns={this.recipeBtn} /> : <SearchResults /> }
        </div>
      </div>,
      <div id="recipes-body">
        <RenderRight initialRender={this.state.initialRender} recipeRender={this.state.recipeRender} editForm={this.state.editForm} value={this.state.recipeHolder}/>
      </div> 
    ]
  }
}

export default App;