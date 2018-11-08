import React, { Component } from 'react';
import Select from 'react-select';
import v4 from 'uuid';

    //opt => this.props.userSelection(opt.label, opt.value)
  type State = {
      isClearable: boolean,
      blurInputOnSelect: boolean,
  };

  export default class SearchResults extends Component<*, State> {
    state = {
          isClearable: true,
          blurInputOnSelect: true,
      };

 helpIdGenerator(){
        return v4()
      }
 
  render(){
  const {
    isClearable,
    blurInputOnSelect,
  } = this.state;


    return(
        <div className="searchInput">
            <Select key={this.helpIdGenerator()} options={this.props.values} isClearable={isClearable} onChange={this.props.userSelection} onFocus={this.props.focus} onBlur={this.props.isFocused} blurInputOnSelect={blurInputOnSelect}/>
        </div>
          )
}
};
