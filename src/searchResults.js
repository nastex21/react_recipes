import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: []
          };    
        this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.sendToBtns = this.sendToBtns.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    }

    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getSuggestions(search) {
        const values = search.trim().toLowerCase();
        const recipeArray = this.props.value;

        const escapedValue = this.escapeRegexCharacters(search.trim());
  
        if (escapedValue === '') {
         return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        if (values === '') {
            return [];
        }
        
        this.props.searchTrue();
        return recipeArray.filter(recipe => regex.test(recipe.dish));
    }

    getSuggestionValue(suggestion) {
        return suggestion.dish;
      }

    sendToBtns(event, id){
        this.props.recipeBtns(event, id);
    }
    
    renderSuggestion(suggestion){
        console.log(suggestion);
        return (
            <div key={suggestion.id} className="recipeNames"><input type="button" defaultValue={suggestion.dish} value={suggestion.dish} onClick={this.props.recipeBtn.bind(this, suggestion.id)} /></div>
        )
      }


    onChange = (event, { newValue, method }) => {
        this.setState({
          value: newValue
        });
      };
      
    onSuggestionsFetchRequested = ({ value }) => {
        console.log('yes!')
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      };
    
    onSuggestionsClearRequested = () => {
        this.props.renderNew();
        this.setState({
          suggestions: []
        });
      };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Type 'c'",
            value,
            onChange: this.onChange
          };
        return (
            <>
            <Autosuggest 
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps} />
            </>
        )
    }
}

export default SearchResults;