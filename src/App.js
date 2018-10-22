import React, { Component } from 'react';
import './App.css';
import Editbtn from './Editbtn';
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipes: []
    }
    this.eachRecipe = this.eachRecipe.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
    this.localSetState = this.localSetState.bind(this);
  }

  componentWillMount(){
    //localStorage.clear();
    let getData = localStorage.getItem('getRecipes');
    console.log("before: " + getData);
    console.log(this.state.recipes);
    let initialArr = [{
      id: 0,
      ingredients: "Corn"
    }, 
  {
    id: 1,
      ingredients: "Milk"
  }]
    getData === null ? this.setState({recipes: [...this.state.recipes, ...initialArr]}) : this.localSetState();
    console.log(this.state.recipes);
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
    console.log("add() line 31: ");

    this.setState(prevState => ({
      recipes: [
        ...prevState.recipes,
        {
          id: this.nextid(),
          ingredients: text
        }
      ]
    }))
  }

  nextid(){
    const idList = this.state.recipes.map(i => i.id);
    var num = 0;

    var returnID = function(){
      var check = idList.indexOf(num);
      console.log(check);

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

  update(newRecipe, i){
    console.log("updating item at index", i, newRecipe);
    this.setState(prevState => ( {
      recipes: prevState.recipes.map(
        recipe => (recipe.id !== i) ?recipe: {...recipe, ingredients: newRecipe}
      )
    } 
    ))
  }

  remove(id){
    console.log("remove is running")
    console.log(id);
    this.setState(prevState => ({
      recipes: prevState.recipes.filter(recipe => recipe.id !== id)
    }))
  }

  eachRecipe(item, i){
    return (
      <Editbtn key={item.id} index={item.id} onChange={this.update} onRemove={this.remove}>{item.ingredients}</Editbtn>
    )
  }

  render() {
    return [
          <div key={guidGenerator()} className="recipes">
            {this.state.recipes.map(this.eachRecipe)}
            <button key={guidGenerator()} onClick={this.add.bind(null, "Next Note")} id="add">Add</button>
          </div>
    ]
  }
}

export default App;
