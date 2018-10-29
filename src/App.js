import React, { Component } from 'react';
import './App.css';
import Editbtn from './Editbtn';
import LeftPaneButtons from "./leftpaneButtons";
import SearchResults from "./searchResults";
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      search: "",
      buttonRender: false
    }
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
    this.localSetState = this.localSetState.bind(this);
    this.search = this.search.bind(this);
    this.renderRecipes = this.renderRecipes.bind(this);
    this.changeFalse = this.changeFalse.bind(this);
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

  componentDidUpdate(){
    localStorage.setItem('getRecipes', JSON.stringify(this.state.recipes));
  }

  localSetState(){
    let getData = JSON.parse(localStorage.getItem('getRecipes'));
    this.setState({
      recipes: [...this.state.recipes, ...getData]
    })
  }


  add(text){
    this.setState(prevState => ({
      recipes: [
        ...prevState.recipes,
        {
          id: this.nextid(),
          dish: "New Recipe",
          servings: "",
          cooking_time: "",
          ingredients: "",
          directions: ""
        }
      ]
    }))
  }

  nextid(){
    const idList = this.state.recipes.map(i => i.id);
    var num = 0;

    var returnID = function(){
      var check = idList.indexOf(num);

      if (check === -1){
        return num;
      } else {
        num++;
        returnID();
      }
      return num;
    }
    
    return returnID();
    
  }

  update(newRecipe, i){
    this.setState(prevState => ( {
      recipes: prevState.recipes.map(
        recipe => (recipe.id !== i) ? recipe : {...recipe, ...newRecipe}
      )
    } 
    )) 
  }

  remove(id){
    this.setState(prevState => ({
      recipes: prevState.recipes.filter(recipe => recipe.id !== id)
    }))
  }

 /*  eachRecipe(item, i){
    return (
      <Editbtn key={item.id} index={item.id} values={item} onChange={this.update} onRemove={this.remove}>{item.id}{item.dish}{item.servings}{item.cooking_time}{item.ingredients}{item.directions}</Editbtn>
    )
  } */

  search(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      buttonRender: false,
      search: value
    })
  }

  changeFalse(event){
    if (this.state.buttonRender == false){
      this.setState({
        buttonRender: true
      })
    }

    this.renderRecipes(event);
  }

  renderRecipes(event){

    
    var recipes  = this.state.recipes.filter(item => item.dish == event.target.value);
    console.log(recipes);
  
    return (

      <Editbtn key={recipes.id} index={recipes.id} values={recipes} onChange={this.update} onRemove={this.remove}>{recipes.id}{recipes.dish}{recipes.servings}{recipes.cooking_time}{recipes.ingredients}{recipes.directions}</Editbtn>
    )
  }

  initialBody(){
    return (
      <div><p>This is a placeholder.</p></div>
    )
  }


  render() {
    return [
      <div id="left-pane">
        <div id="search">
           <input onChange={this.search} />
        </div>
        <div id="results">
        {this.state.search == "" ? <LeftPaneButtons values={this.state.recipes} changeButtons={this.changeFalse} /> : <SearchResults /> }
        </div>
      </div>,
      <div id="recipes-body">
        {this.state.buttonRender == false ? this.initialBody() : this.renderRecipes}
      </div> 
    ]
  }
}

export default App;