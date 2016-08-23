import React, { Component } from 'react';
import HouseListOfListings  from '../houseListOfListings';
import SingleProfile        from '../singleProfile';

export default class MyProfile extends Component {
  constructor(){
    super();
    this.state = {};
  }
  componentWillMount(){

    let userID = window.localStorage.getItem('userID');
    let authToken = window.localStorage.getItem('token');
    
    fetch('/v1/listings/'+userID+'?access_token='+authToken)
    .then(response => response.json())
    .then(json => {
      this.setState({ favorites: json });
    });
  }
  render() {
    return (
      <div>
        <HouseListOfListings 
          houses={this.state.favorites} 
          page='profile'/>
        <SingleProfile />
      </div>
    )
  }
}
