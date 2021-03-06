import React, { Component }                           from 'react';
import { Router, Route, hashHistory, browserHistory}  from 'react-router';

class SignInForm extends Component {

  handleSubmit(e, username, password) {
    e.preventDefault();
    let successLogIn = false;

    fetch('/v1/users/signin', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username.value.toLowerCase(),
          password: password.value
      })
    })
    .then(response => {
      if(response.ok === true){
          successLogIn = true;
      } else {
          alert('Wrong username or password. Please try again.');
      }
      return response.json();
    })
    .then((data) => {
      if (successLogIn){
          window.localStorage.setItem('userID', data.user_id);
          window.localStorage.setItem('token', data.token);
          window.location = '#/';
      }
    });
  }
  render(){
    return (
      <form 
        className='form-style-6' 
        onSubmit={e => this.handleSubmit(e, this.username, this.password)}>

        <h1>USER LOGIN</h1>
        <label>Username: </label>
        <input 
            type='text'
            ref={(username) => this.username = username} />
        <br/>
        <label>Password: </label>
        <input 
            type='password' 
            pattern=".{5,}" 
            ref={(password) => this.password = password} /><br/>
        <input 
            type="submit" 
            value="Sign In"/>
            
      </form>
      )
  }
}
export default SignInForm
