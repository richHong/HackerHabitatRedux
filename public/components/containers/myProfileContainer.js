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
    fetch('https://lit-harbor-15852.herokuapp.com/v1/listings/'+userID)
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
