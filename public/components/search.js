import React, { Component }                                                 from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import { connect }                                                          from 'react-redux';
import { getHouseAction }                                                   from '../actions/houseActions';
import { Router, Route, hashHistory, browserHistory, Link }                 from 'react-router';

class SearchBar extends Component {
	onSubmit(e){
    e.preventDefault();
		var searchable = this.search.value.toLowerCase();
    
		fetch('/v1/listings/city/:'+searchable)
    	.then(response => response.json())
    	.then(json => {
        this.props.getHouseAction(json);
        hashHistory.push('results');
      });
	}
  render(){
    return (
      <div className='searchDiv'>
        <form onSubmit={ e => this.onSubmit(e) }>
          <input 
            placeholder='Search by City' 
            ref={ (input) => this.search = input } 
            className='searchbox' />
          <img 
            onClick={ this.onSubmit.bind(this) } 
            className='magnify searchbutton'
            src='https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-016_search_zoom_find-512.png'/>
        </form>
      </div>
    )
  }
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getHouseAction }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
