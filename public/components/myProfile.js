import React, { Component } from 'react';
import HouseListOfListings from './houseListOfListings';
import SingleProfile from './singleProfile';

export default class MyProfile extends Component {
  constructor(){
    super();
    this.state = {};
  }
  componentWillMount(){
    let userID = window.localStorage.getItem('userID');

    fetch('http://localhost:3001/v1/listings/?user_id='+userID)
    .then(response => response.json())
    .then(json => {
      this.setState({favorites: json.data});
    });
  }
  render() {
    return (
      <div>
        <HouseListOfListings houses={this.state.favorites} page='profile'/>
        <SingleProfile />
      </div>
    )
  }
}
