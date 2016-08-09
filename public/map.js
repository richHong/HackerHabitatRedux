import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import { singleListingAction } from './houseActions';

class GMaps extends React.Component {
  constructor(props){
    super(props);
    const that = this;
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
        width={'60%'}
        height={'100vh'}
        lat={(this.props.listings.length > 0) ? this.props.listings[0].lat : 37.8780068}
        lng={(this.props.listings.length > 0) ? this.props.listings[0].lng : -122.2695097}
        zoom={13}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyAMUWIppT-jbjMztrR6tWSV7Y58jTZi2Sw'}}
        onMapCreated={this.onMapCreated}>
        {(this.props.listings.length > 0) ? this.props.listings.map((house, i) => {
          return (
          <Marker
            key={i}
            lat={house.lat}
            lng={house.lng} />
            )
        }) : null}
        {(this.props.listings.length > 0) ? this.props.listings.map((house, i) => {
          return (
          <InfoWindow
            key={i}
            lat={house.lat}
            lng={house.lng}
            content={house.house_name} />
            )
        }) : null}
      </Gmaps>
      );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({singleListingAction: singleListingAction}, dispatch)
}
function mapStateToProps(state) {
    return {
      listings: state.listings.searchResults,
      singlelisting: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GMaps)
