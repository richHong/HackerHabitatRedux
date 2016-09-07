import React, { Component } from 'react';
import HouseListOfListings  from '../houseListOfListings';
import SingleProfile        from '../singleProfile';
import TwitterFeed          from '../twitterFeed';
import _                    from 'underscore';

export default class MyProfile extends Component {
  constructor(){
    super();
    this.state = {
      tweets:[],
      favorites:[]
    };
  }
  componentWillMount(){

    let userID = window.localStorage.getItem('userID');
    let authToken = window.localStorage.getItem('token');
    
    fetch('/v1/listings/'+userID+'?access_token='+authToken)
    .then(response => response.json())
    .then(json => {
      this.setState({ favorites: json });
    });

    fetch('/twitter')
    .then(response => response.json())
    .then(json => {
      let tweets = _.uniq(json.statuses, 'text');
      this.setState({ tweets });
    });
  }
  render() {
    return (
      <div>
        <HouseListOfListings 
          houses={ this.state.favorites } 
          page='profile'/>
        <SingleProfile />
        <TwitterFeed tweets={ this.state.tweets }/>
      </div>
    )
  }
}
