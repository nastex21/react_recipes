import React, { Component } from 'react';
import './App.css';
import LeftPaneButtons from "./leftpaneButtons"; 
import SearchResults  from "./searchResults"; 
import RenderRight from "./RenderBody"; 
import EditForm from "./Editform";
import { FaPlus } from 'react-icons/fa';

var myuniqueidcounter = 0;
function uniqueId() {
  return myuniqueidcounter++;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      initialRender: true, //what to render when app is first loaded
      recipeRender: false, //render recipe 
      addRecipe: false, //recipe is added
      editForm: false, // render edit form when edit button is clicked
      search: false, //boolean for search and how to render
      recipes: [], //hold recipe collection
      results: [], // used to hold results of search
      id: "",
      dish: "",
      servings: "",
      cooking_time: "",
      ingredients: "",
      directions: "", 
    }

    this.recipeBtn = this.recipeBtn.bind(this);
    this.add = this.add.bind(this);
    this.nextid = this.nextid.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.editFunction = this.editFunction.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.userSelection = this.userSelection.bind(this);
    this.focus = this.focus.bind(this);
    this.editFormTrue = this.editFormTrue.bind(this);
    this.searchValues = this.searchValues.bind(this);
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
    }

  //localSetState is ran when getData has actual data and used to populate the recipes array
  localSetState(){
      let getData = JSON.parse(localStorage.getItem('getRecipes'));
      this.setState({
        recipes: [...this.state.recipes, ...getData]
      })
    }

    //if recipe button is pressed, run this
  recipeBtn(id, event){
      var value = this.state.recipes.filter(item => item.id === id);
        this.setState({
          id: value[0].id,
          dish: value[0].dish,
          servings: value[0].servings,
          cooking_time: value[0].cooking_time,
          directions: value[0].directions,
          ingredients: value[0].ingredients,
          addRecipe: false,
          editForm: false,
          initialRender: false,
          search: false,
          recipeRender: true
        })
      }

  //function to add blank recipe card when button is clicked
  add(text){

    //add recipe to recipes array
    this.setState({
      recipes: [
        ...this.state.recipes,
        {
          id: this.nextid(), //create new ID by running this function,
          dish: text,
          servings: "",
          cooking_time: "",
          ingredients: "",
          directions: "",
        }
      ],
      addRecipe: false,
      recipeRender: false,
      editForm: false,
      search: false,
      initialRender: true,
    })
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
      addRecipe: false,
      editForm: false,
      search: false,
      recipeRender: false
    })
  }

  //run the EditForm componet when triggered
  editFunction(){
    return(
      <div key={this.state.dish[0] + this.state.id}>
        <EditForm key={this.state.dish[1] + this.state.id} id={this.state.id} dish={this.state.dish} servings={this.state.servings} cooking_time={this.state.cooking_time} ingredients={this.state.ingredients} directions={this.state.directions} handleInputChange={this.handleInputChange} save={this.save} />
      </div>
    )
  }

  //handle input change from <Editform />
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
  }

  //save the editForm input values when "Save" button is clicked
  save(e){
    e.preventDefault();
    let newRecipe = {
      id: this.state.id,
      dish: this.state.dish,
      servings: this.state.servings,
      cooking_time: this.state.cooking_time,
      ingredients: this.state.ingredients,
      directions: this.state.directions
  }
    this.setState(prevState => ( {
      recipes: prevState.recipes.map(
        recipe => (recipe.id !== this.state.id) ? recipe : {...recipe, ...newRecipe}
      ), 
    } 
    ))  
    this.setState({
      initialRender: false,
      addRecipe: false,
      editForm: false,
      search: false,
      recipeRender: true
    })
}

//remove recipe 
remove(id){
  this.setState(prevState => ({
    recipes: prevState.recipes.filter(recipe => recipe.id !== this.state.id),
      recipeRender: false, 
      addRecipe: false, 
      editForm: false,
      search: false,
      initialRender: true,
  }))
}

//when user selects an option from the drop down suggestion menu, this gets triggered. It updates and renders the recipe they selected.
userSelection(sentValue){

var value;
  if (sentValue === null){
   value = ''
  } else {
    value = this.state.recipes.filter(item => item.id === sentValue.value);
  }


if (value !== ''){
  this.setState({
    id: value[0].id,
    dish: value[0].dish,
    servings: value[0].servings,
    cooking_time: value[0].cooking_time,
    ingredients: value[0].ingredients,
    directions: value[0].directions
})
/* } else if (){
 */
} else {
  this.setState({
    id: '',
    dish: '',
    servings: '',
    cooking_time: '',
    ingredients: '',
    directions: ''
})
}
      
  if(this.state.search === false){
    this.setState({
      search: true,
    })
  } 
}

//when user selects the input, this gets triggered. 
focus(){
  if(this.state.editForm === true){
    this.setState({
      recipeRender: false, 
      addRecipe: false, 
      editForm: false,
      search: false,
      initialRender: false,
    })
  }else if(this.state.editForm === false){
    this.setState({
      recipeRender: false, 
      addRecipe: false, 
      editForm: false,
      search: false,
      initialRender: false,
    })
  }
}

//sets the editForm state to true
editFormTrue(){
    this.setState({
      editForm: true
    })
}

//values for drop down select input
searchValues(){
  //const value = chosenValue === null ? '' : chosenValue.value this.setState({ value });
  return this.state.recipes.map(item => ({ label: item.dish === null ? '' : item.dish, value: item.id }));
}

  render(){
   return [
      <div id="left-pane">
        <div id="search">
            <h2>Dishes</h2>
        </div>
        <div id="results">
        <SearchResults values={this.searchValues()} userSelection={this.userSelection} focus={this.focus}  /> <button onClick={this.add.bind(null, "Add Your Dish")}><FaPlus /></button>
        {this.state.search === false ? <LeftPaneButtons  values={this.state.recipes} recipeBtns={this.recipeBtn}/> : null}
        </div>
      </div>,
      <div key={this.state.servings[0] !== "" ? this.state.servings[0] + this.state.id : this.state.id} id="recipes-body">
        {this.state.editForm ? this.editFunction() : <RenderRight key={uniqueId()} initialRender={this.state.initialRender} recipeRender={this.state.recipeRender} addRecipe={this.state.addRecipe} id={this.state.id} dish={this.state.dish} servings={this.state.servings} cooking_time={this.state.cooking_time} ingredients={this.state.ingredients} directions={this.state.directions} resetStates={this.resetAll} remove={this.remove} search={this.state.search} edit={this.editFormTrue} />}
      </div> 
    ]
  }
}

export default App; 