import React, { Component } from 'react';

class SearchResults extends Component {
    constructor(props){
        super(props);
        this.resultsSearch = this.resultsSearch.bind(this);
        this.debouncedBuildResults = this.debouncedBuildResults.bind(this);
    }

    sendToBtns(event, id){
        this.props.recipeBtns(event, id);
    }

    debouncedBuildResults(){

        console.log("working")
   /*  debounce(function(e) {
        schResults.innerHTML = "";
        if (e.target.value.length < 3) {
            return;
        }
        for (var i = 0; i < SETTINGS.resultsLimit; i++) {
            buildResults(e.target.value, data[i]);
        }
    }, 250); */
}

    resultsSearch(){
        var dishesValues = this.props.value;
        console.log(dishesValues);
       /*  var elements = [];
        dishesValues.forEach((item, index) => { 
            elements.push(<div key={item.id} className="recipeNames"><input type="button" defaultValue={item.dish} value={item.dish} onClick={this.sendToBtns.bind(this, item.id)} /></div>)
            
        })
        return elements; */
        return <p>{dishesValues}</p>
      
    }

    render(){
        return this.resultsSearch();
    }
}

export default SearchResults;