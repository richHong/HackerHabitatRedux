import React, { Component } from 'react';
import SignInForm           from '../forms/signInForm';

export default class SignIn extends Component {
  render() {
    return (
      <div className='signInForm'>
        <SignInForm />
      </div>
    )
  }
}
