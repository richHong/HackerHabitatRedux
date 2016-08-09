import React from 'react';
import { createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { getHouseAction } from "./houseActions"
import { Router, Route, hashHistory, browserHistory, Link } from 'react-router';

class SearchBar extends React.Component {
	render(){
		return (
			<div className='searchDiv'>
        <form onSubmit={e => this.onSubmit(e)}>
  				<input placeholder='Search by City' ref={(input) => this.search = input} className='searchbox' />
      		<img onClick={this.onSubmit.bind(this)} className='magnify searchbutton'src='https://cdn2.iconfinder.com/data/icons/picons-basic-1/57/basic1-016_search_zoom_find-512.png'/>
        </form>
      </div>
    )
	}

	onSubmit(e){
    e.preventDefault();
		var searchable = this.search.value.replace(" ", "+").toLowerCase();;
		fetch('http://localhost:3001/v1/listings/?city=' + searchable)
    	.then(response => response.json())
    	.then(json => {
        this.props.getHouseAction(json.data);
        hashHistory.push('results');
      })
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({getHouseAction: getHouseAction}, dispatch)
}

function mapStateToProps(state){
  return {
    listing: state.listings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
