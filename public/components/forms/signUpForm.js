import React, { Component } from 'react';

class SignUpForm extends Component {
	render(){
		return (
			<form id="signupform">
				<h1>SIGN UP</h1>
				Username: 
				<input 
					type='text'
					ref={ username  => this.username = username } />
				<br />
				Password: 
				<input 
					type='password' 
					pattern=".{5,}" 
					ref={ password  => this.password = password } />
				<br />
				Confirm Password: 
				<input 
					type='password' 
					ref={ confirmPassword => this.confirmPassword = confirmPassword } />
				<br />
				Email:
				<input 
					type="email" 
					ref={ email => this.email = email} />
				<br />
				<input 
					type='submit' 
					onClick={ this.submitForm.bind(this) } 
					to="/createProfile" 
					value='Join'/>
			</form>
	   )
  }
	submitForm(e) {
	    e.preventDefault()

	    let username = this.username.value.toLowerCase(),
	    		password = this.password.value;
	    
	    if (password.length >= 5) {
	        if (password === this.confirmPassword.value) {
	            if (this.email.value.indexOf("@") > -1 && this.email.value.indexOf(".") > -1) {
	            	
                fetch('/v1/users/', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      username: username,
                      password: password,
                      email: this.email.value
                	})
                })
                .then(response => response.json())
                .then(data => {
                  window.localStorage.setItem('token', data.token);
                  window.localStorage.setItem('userID', data.user_id);
									window.location = '#/createProfile';
            });
	            } else {
	            	alert('Error creating account')
	            }
					}
			}
	}
}
export default SignUpForm;
