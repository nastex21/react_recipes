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
      addRecipe: false, //recipe is added
      editForm: false, // render edit form when edit button is clicked
      recipes: [], //hold recipe collection
      recipeHolder: [], //hold single recipe to render
      search: "" //hold search value
    }

    this.recipeBtn = this.recipeBtn.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.editFunction = this.editFunction.bind(this);
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
      console.log(value)
      this.setState({
          recipeHolder: [...value],
          initialRender: false,
          recipeRender: true,
          editForm: false
        })
  }

  //function to add blank recipe card when button is clicked
  add(text){
    console.log(text);
    var value = this.state.recipes;

    //add recipe to recipes array
    this.setState(prevState => ({
      recipes: [
        ...prevState.recipes,
        {
          id: this.nextid(), //create new ID by running this function
          dish: text
        }
      ],
  
      initialRender: false,
      recipeRender: false, 
      addRecipe: true, 
      editForm: false  
    }))
  }

  //used to create new IDs for recipes
   nextid(){
    const idList = this.state.recipes.map(i => i.id);
    var num = 0;

    var returnID = function(){
      var check = idList.indexOf(num);

      if (check === -1){
        return num;
      } else {
        num++;
        console.log(num);
        returnID();
      }
      return num;
    }
    
    return returnID();
    
  }

  //reset all checks for edit function
  resetAll(){
    this.setState({
      initialRender: false,
      recipeRender: false, 
      addRecipe: false,
      editForm: false
    })
  }

  editFunction(){
    return[
      <p>WORKS!</p>
    ]
  }

  render(){
  console.log(this.state.search);

   return [
      <div id="left-pane">
        <div id="search">
            <h2>Dishes</h2>
            <input  />
            <button onClick={this.add.bind(null, "Next Note")}>Add</button>
        </div>
        <div id="results">
        {this.state.search == "" ? <LeftPaneButtons values={this.state.recipes} recipeBtns={this.recipeBtn} /> : <SearchResults /> }
        </div>
      </div>,
      <div id="recipes-body">
        <RenderRight initialRender={this.state.initialRender} recipeRender={this.state.recipeRender} editForm={this.state.editForm} addRecipe={this.state.addRecipe} value={this.state.recipeHolder} resetStates={this.resetAll} editThis={this.editFunction} />
      </div> 
    ]
  }
}

export default App;