import React, { Component } from 'react';
//import './App.css';
import Editbtn from './Editbtn';
/* import LeftPaneButtons from "./leftpaneButtons"; */
/* import SearchResults from "./searchResults"; */
/* import RenderRight from "./RenderBody"; */
import { guidGenerator } from "./generateuniqkey";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 5
    }
  }

  

  render(){
    return <Editbtn value={this.state.value} />
  }
}

export default App;