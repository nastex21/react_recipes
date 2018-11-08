import React, { Component } from 'react';
import './App.css';
import LeftPaneButtons from "./leftpaneButtons"; 
import SearchResults  from "./searchResults"; 
import RenderRight from "./RenderBody"; 
import EditForm from "./Editform";
import { FaPlus, FaHome } from 'react-icons/fa';

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
    this.home = this.home.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillMount(){
    //localStorage.clear();
    let getData = localStorage.getItem('getRecipes');

    //used to create template recipes and store in client's computer
    let initialArr = [{
      id: 0,
      dish: "Hamburger",
      servings: 4,
      cooking_time: "20 minutes",
      ingredients: "1 1/2 pounds ground beef; 2 Tablespoons BBQ sauce; 1 teaspoon kosher salt; 1/2 teaspoon pepper; 1/2 teaspoon garlic powder; 4 hamburger buns",
      directions: "1) Preheat the grill to medium high. 2) Combine the ground beef, BBQ sauce, salt, garlic powder, and pepper in a medium-sized bowl. Mix just until combined with your hands and shape into 4 patties about 3/4-inch thick. Make a well in your patties with your thumb to prevent from bulging. 3) Place burgers on the grill and cook 4 to 5 minutes. Flip and then cook an additional 4-5 minutes, or until juices run clear. Top with cheese slices, if desired. Grill until cheese has melted and turn off the heat. 4) Serve hamburgers on buns with your favorite toppings. "
    },
    { id: 1,
      dish: "Pepperoni Pizza",
      servings: 6,
      cooking_time: "20 minutes",
      ingredients:"1 can (8 oz each) Hunt's Tomato Sauce-No Salt Added; 1/4 cup grated Parmesan cheese; 1/4 teaspoon dried oregano; 1 prebaked thin pizza crust (12-inch); 1 cup shredded part-skim mozzarella cheese; 1/3 cup sliced pepperoni",
       directions: "1) Preheat oven to 450°F. Combine tomato sauce, Parmesan cheese and oregano in small bowl; spread tomato sauce evenly over crust. Sprinkle pizza with mozzarella cheese; top with pepperoni. 2) Place on ungreased pizza pan. Bake 12 to 15 minutes or until edges of crust are browned lightly and cheese melts. Cut pizza into 6 slices."
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
    return[
      <div className="editForm">
        <EditForm key={this.state.dish[1] + this.state.id} id={this.state.id} dish={this.state.dish} servings={this.state.servings} cooking_time={this.state.cooking_time} ingredients={this.state.ingredients} directions={this.state.directions} handleInputChange={this.handleInputChange} save={this.save} cancel={this.cancel}/>
      </div>
    ]
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
        recipe => (recipe.id !== this.state.id) ? recipe : {...recipe, ...newRecipe}),
      initialRender: false,
      addRecipe: false,
      editForm: false,
      search: false,
      recipeRender: true
    } 
    ))  

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
  return this.state.recipes.map(item => ({ label: item.dish === null ? '' : item.dish, value: item.id }));
}

//method to basically reset the app
home(){
this.setState({
      addRecipe: false,
      editForm: false,
      search: false,
      recipeRender: false,
      initialRender: true
})
}

//method to cancel out of the edit method process
cancel(id, event){
  var recipeObj = this.state.recipes.filter((recipe) => recipe.id === id);
  event.preventDefault();
  this.setState(({
    id: recipeObj[0].id,
    dish: recipeObj[0].dish,
    servings: recipeObj[0].servings,
    cooking_time: recipeObj[0].cooking_time,
    ingredients: recipeObj[0].ingredients,
    directions: recipeObj[0].directions,
    editForm: false,
    search: false,
    initialRender: false,
    addRecipe: false,
    recipeRender: true
  }))  
}

  render(){
   return [
     <div id="headerTitle">
       <h1>Recipe Box</h1>
     </div>,
     <div id="appBox">
      <div id="left-pane">
        <div id="search">
            <h2 id="headerContainer"><span>Dishes</span></h2>
            <hr className="dishHR hrStyle" />
        </div>
        <div id="results">
            <SearchResults values={this.searchValues()} userSelection={this.userSelection} focus={this.focus}  /> 
            {this.state.search === false ? <LeftPaneButtons  values={this.state.recipes} recipeBtns={this.recipeBtn}/> : null}
        </div>
        <div id="addDiv">
           <button className="homeCancel" onClick={this.home} ><FaHome /></button>
           <button className="addBtn" onClick={this.add.bind(null, "Add Your Dish")}><FaPlus className="plusIcon" /></button>
        </div>
      </div>
        {this.state.editForm ? this.editFunction() : <div key={this.state.servings[0] !== "" ? this.state.servings[0] + this.state.id : this.state.id} id="recipes-body"><RenderRight key={uniqueId()} initialRender={this.state.initialRender} recipeRender={this.state.recipeRender} addRecipe={this.state.addRecipe} id={this.state.id} dish={this.state.dish} servings={this.state.servings} cooking_time={this.state.cooking_time} ingredients={this.state.ingredients} directions={this.state.directions} resetStates={this.resetAll} remove={this.remove} search={this.state.search} edit={this.editFormTrue} /></div>}
        </div>
     
    ]
  }
}

export default App; 