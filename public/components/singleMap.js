import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';

class SingleGMaps extends React.Component {
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
        width={'60%'}
        height={'100vh'}
        lat={this.props.listing ? this.props.listing.lat : 37.8780068}
        lng={this.props.listing ? this.props.listing.lng : -122.2695097}
        zoom={16}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyAMUWIppT-jbjMztrR6tWSV7Y58jTZi2Sw'}}
        onMapCreated={this.onMapCreated}>
        {this.props.listing ?
          <Marker
            lat={this.props.listing.lat}
            lng={this.props.listing.lng} />
         : null}
        {this.props.listing ?
          <InfoWindow
            lat={this.props.listing.lat}
            lng={this.props.listing.lng}
            content={this.props.listing.house_name} />
            : null}
      </Gmaps>
      );
  }
}
function mapStateToProps(state) {
    return {
      listing: state.listings.singleListing
    }
  }

export default connect(mapStateToProps)(SingleGMaps)
