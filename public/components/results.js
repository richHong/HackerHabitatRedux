import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseListOfListings from './houseListOfListings';
import HouseListing from './houseListing';
import GMaps from './map';
// import houseListingReducer from './appReducers'

class Results extends Component {
 render(){
    return (
      <div>
        {this.props.listings ? <HouseListOfListings houses={this.props.listings} /> : null}
        <GMaps />
      </div>
    )
  }
}

function mapStateToProps(state) {
 return {
    listings: state.listings.searchResults
  }
}

export default connect(mapStateToProps)(Results);