import React, { Component } from 'react';

export default class singleProfile extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){

    let authToken = window.localStorage.getItem('token');
    let userID = window.localStorage.getItem('userID');

     fetch('http://localhost:3001/v1/users/'+userID+'?access_token='+authToken)
     .then(response => response.json())
     .then(json => this.setState(json.data[0]));
  }
  render() {
    return (
      <div>
        <div className='profileContainer'>

          <div className='avatarContainer'>
            <img className='avatar' src={this.state.avatar || 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png'} />
          </div>

          <div className='infoContainer'>

          {this.state.username ?
            <div>
              <span><b><i>Username:</i></b> {this.state.username}</span><br /><br />
              <span><b><i>Name:</i></b> {this.state.first_name} {this.state.last_name}</span><br /><br />
              <span><b><i>Hometown:</i></b> {this.state.hometown}</span><br /><br />
              <span><b><i>Occupation:</i></b> {this.state.occupation}</span><br /><br />
              <span><b><i>Description:</i></b> {this.state.description}</span><br /><br />
              <span><b><i>General Interests:</i></b> {this.state.gen_interests ? this.state.gen_interests.split(',').map((interest, i) => <span key={i} >{interest}, </span>) : null}</span><br /><br />
              <span><b><i>Tech Interests:</i></b> {this.state.tech_interests ?this.state.tech_interests.split(',').map((interest, i) => <span key={i} >{interest}, </span>) : null}</span><br /><br />
            </div>
            : null}

          </div>
        </div>
      </div>
    )
  }
}
