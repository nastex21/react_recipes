import React, { Component } from 'react';
import './App.css';
import Editbtn from './Editbtn';
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: [],
      search: ""
    }
    this.eachRecipe = this.eachRecipe.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
    this.localSetState = this.localSetState.bind(this);
    this.leftPane = this.leftPane.bind(this);
    this.leftResults = this.leftResults.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount(){
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

  eachRecipe(item, i){
    return (
      <Editbtn key={item.id} index={item.id} values={item} onChange={this.update} onRemove={this.remove}>{item.id}{item.dish}{item.servings}{item.cooking_time}{item.ingredients}{item.directions}</Editbtn>
    )
  }

  search(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      search: value
    })
  }

  leftPane(){
    
  }

  leftResults(){
    return(
      <p>{this.state.search}</p>
    )
  }

  render() {
    return [
      <div id="left-pane">
        <div id="search">
           <input onChange={this.search} />
        </div>
        <div id="results">
        {this.state.search == "" ? this.leftPane() : this.leftResults() }
        </div>
      </div>,
      <div id="recipes-body">
      </div> 
    ]
  }
}

export default App;