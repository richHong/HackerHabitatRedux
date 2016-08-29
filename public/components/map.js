import React, { Component }                                                 from 'react';
import { connect }                                                          from 'react-redux';
import { Gmaps, Marker, InfoWindow, Circle }                                from 'react-gmaps';
import { createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import { singleListingAction }                                              from '../actions/houseActions';
import * as config                                                          from '../../config';

class GMaps extends React.Component {
  constructor(props){
    super(props);
  }
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
      panControl:true,
      zoomControl:true,
      mapTypeControl:true,
      scaleControl:true,
      streetViewControl:true,
      overviewMapControl:true,
      rotateControl:true
    });
  }
  render(){
    return (
      <Gmaps
        width={ '60%' }
        height={ '100vh' }
        lat={ (this.props.listings.length > 0) ? this.props.listings[0].lat : 37.8780068 }
        lng={ (this.props.listings.length > 0) ? this.props.listings[0].lng : -122.2695097 }
        zoom={ 13 }
        loadingMessage={ 'Loading...' }
        params={ {v: '3.exp', key: process.env.googleMapKey || config.googleMapKey} }
        onMapCreated={ this.onMapCreated }>
        { (this.props.listings.length > 0) ? this.props.listings.map((house, i) => {
          return (
          <Marker
            key={ i }
            lat={ house.lat }
            lng={ house.lng } />
            )
        }) : null }
        { (this.props.listings.length > 0) ? this.props.listings.map((house, i) => {
          return (
          <InfoWindow
            key={ i }
            lat={ house.lat }
            lng={ house.lng }
            content={ house.house_name } />
            )
        }) : null }
      </Gmaps>
      );
  }
}
function mapStateToProps(state) {
    return {
      listings: state.listings.searchResults
    }
}

export default connect(mapStateToProps)(GMaps)
