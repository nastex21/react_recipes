import React, { Component } from 'react';
import './App.css';
import Editbtn from './Editbtn';
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      recipe: [{
        id: 0,
        recipe: "Corn"
      }, 
    {
      id: 1,
      recipe: "Milk"
    }]
    }
    this.eachRecipe = this.eachRecipe.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
  }

  componentWillUpdate(){
    //localStorage.setItem(this.state.recipe, data)
  }

  add(text){
    console.log("add() line 31: ")
    this.setState(prevState => ({
      recipe: [
        ...prevState.recipe,
        {
          id: this.nextid(),
          note: text
        }
      ]
    }))
  }

  nextid(){
    this.uniqueId = this.uniqueId || 0;
    console.log(this.uniqueId);
    return this.uniquidId++;
  }

  update(newRecipe, i){
    console.log("updating item at index", i, newRecipe);
    this.setState(prevState => ({
      recipe: prevState.recipe.map(
        recipe => (recipe.id !== i) ? recipe: {...recipe, recipe: newRecipe}
      )
    }))
  }

  remove(id){
    this.setState(prevState => ({
      recipe: prevState.recipe.filter(recipe => recipe.id !== id)
    }))
  }

  eachRecipe(item, i){
    console.log(item);
    return (
      <Editbtn key={item.id} index={item.id} onChange={this.update} onRemove={this.remove}>{item.recipe}</Editbtn>
    )
  }

  render() {
    return [
          <div className="recipes">
            {this.state.recipe.map(this.eachRecipe)}
            <button onClick={this.add.bind(null, "Next Note")} id="add">Add</button>
          </div>
    ]
  }
}

export default App;
