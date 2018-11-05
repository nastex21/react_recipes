import React, { Component } from 'react';
import Select from 'react-select';

    //opt => this.props.userSelection(opt.label, opt.value)
  type State = {
      isClearable: boolean,
      blurInputOnSelect: boolean
  };

  export default class SearchResults extends Component<*, State> {
    state = {
          isClearable: true,
          blurInputOnSelect: true
      };
 
  render(){
  const {
    isClearable,
    blurInputOnSelect
  } = this.state;
  console.log(this.props.values)
    return(
        <div className="app">
          <div className="container">
            <Select options={this.props.values} isClearable={isClearable} onFocus={this.props.focus} onChange={opt => this.props.userSelection(opt.label, opt.value, isClearable)} onBlur={this.props.isFocused} blurInputOnSelect={blurInputOnSelect} />
          </div>
        </div>
          )
}
};
