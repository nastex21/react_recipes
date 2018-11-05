import React, { Component } from 'react';
import Select from 'react-select';

class SearchResults extends Component { 
 
render(){
    return(
        <div className="app">
          <div className="container">
            <Select options={this.props.values}  onChange={opt => this.props.userSelection(opt.label, opt.value)} onFocus={this.props.focus} onBlur={this.props.isFocused} blurInputOnSelect={true} />
          </div>
        </div>
          )
}
};

export default SearchResults;
