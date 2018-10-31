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
      buttonValue: [],
      buttonRender: false, 
      initialRender: true, 
      recipeBtnClick: false,
      add: false
    }
    this.localSetState = this.localSetState.bind(this);
    this.changeButtonState = this.changeButtonState.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
    this.updateButtonValue = this.updateButtonValue.bind(this);
    this.resetStates = this.resetStates.bind(this);
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
    
    }

  updateButtonValue(){
    var value = this.state.recipes;
    var data = value[value.length -1];
    console.log(this.state.recipes);
    console.log(data);
    this.setState({
        buttonValue: [{...data}]
  })
    console.log(this.state.buttonValue);
}

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
        buttonValue: [...value],
        initialRender: false,
        recipeBtnClick: true
      })
  }

  resetStates(add){
    console.log("RESETSTATES:" + add)
    if (add == 1){
      this.setState({
        add: false
      })
    }
  }

  add(text){
    console.log("add() line 31: ");
    console.log(text);
    var value = this.state.recipes;

    this.setState(prevState => ({
      recipes: [
        ...prevState.recipes,
        {
          id: this.nextid(),
          dish: text
        }
      ],
      buttonRender: false, 
      initialRender: false, 
      recipeBtnClick: false,
      add: true
    }))
    console.log(this.state.recipes);
    console.log(value[value.length - 1])
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
    console.log(newRecipe);
    this.setState(prevState => ( {
      recipes: prevState.recipes.map(
        recipe => (recipe.id !== i) ? recipe : {...recipe, ...newRecipe}
      )
    } 
    ))  
  }

  remove(id){
    console.log("remove is running")
    console.log(id);
    this.setState(prevState => ({
      recipes: prevState.recipes.filter(recipe => recipe.id !== id),
      initialRender: true
    }))
  }

  render() {
    var lastValue = this.state.recipes;
    var data = lastValue[lastValue.length -1];
    return [
      <div id="left-pane">
        <div id="search">
            <h2>Dishes</h2>
            <input onChange={this.search} />
            <button onClick={this.add.bind(null, "Next Note")}>Add</button>
        </div>
        <div id="results">
        {this.state.search == "" ? <LeftPaneButtons values={this.state.recipes} changeButtons={this.changeButtonState} /> : <SearchResults /> }
        </div>
      </div>,
      <div id="recipes-body">
          <Editbtn value={this.state.buttonValue} onChange={this.update} onRemove={this.remove} clicked={this.state.recipeBtnClick} initialRender={this.state.initialRender} add={this.state.add} lastItem={data} resetState={this.resetStates}/>
      </div> 
    ]
  }
}

export default App;