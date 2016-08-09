import React from 'react';

class SignUpForm extends React.Component {
	render(){
		return (
			<form id="signupform">
				<h1>SIGN UP</h1>
				Username: <input type='text'ref={(username) => this.username = username} /><br />
				Password: <input type='password' pattern=".{5,}" ref={(password) => this.password = password} /><br />
				Confirm Password: <input type='password' ref={(confirmPassword) => this.confirmPassword = confirmPassword} /><br />
				Email:<input type="email" ref={(email) => this.email = email} /><br />
				<input type='submit' onClick={this.submitForm.bind(this)} to="/createProfile" value='Join'/>
			</form>
	   )
  }

	submitForm(e) {
	    e.preventDefault()
	    let username = this.username.value.toLowerCase();
	    let password = this.password.value;
	    if (password.length >= 5) {
	        if (password === this.confirmPassword.value) {
	            if (this.email.value.indexOf("@") > -1 && this.email.value.indexOf(".") > -1) {
	                fetch('http://localhost:3001/v1/users/', {
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
	                    .then(function(response) {
	                        if (response.statusText === 'OK') {
                            console.log('success');
	                        } else {
	                            alert("Either your email or username is already taken please try again")
	                        }
	                    })
	                    .then(function() {
	                        fetch('http://localhost:3001/v1/access_tokens', {
	                                method: 'POST',
	                                headers: {
	                                    'Content-Type': 'application/json'
	                                },
	                                body: JSON.stringify({
	                                    username: username,
	                                    password: password,
	                                    grant_type: 'password'
	                                })
	                            })
	                            .then(response => response.json())
	                            .then((data) => {
	                                window.localStorage.setItem('token', data.data[0].access_token);
	                                window.localStorage.setItem('userID', data.data[0].user_id);
                                  window.localStorage.setItem('i', data.data[0].id);
																	window.location = '#/createProfile';
	                            });
	                    });

	            } else {
	                alert("Please enter a valid email address")
	            }
	        } else {
	            alert("Please Confirm Your Password")
	        }
	    } else {
	        alert("Your Password must be at least 5 Characters in Length")
	    }
	}
}

export default SignUpForm
