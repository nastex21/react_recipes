import React, { Component } from 'react';
import { guidGenerator } from "./generateuniqkey";

class Editbtn extends Component {
  constructor(props){
    super(props);

    this.edit = this.edit.bind(this);
  }

  edit(){
    return console.log(this.props.value)
  }


  render(){
    return (
        <button onClick={this.edit}>Edit</button>
    )
  }
  
}

export default Editbtn;