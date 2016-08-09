import React from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';

let loggedIn = function() {
  return !!localStorage.token;
};

class NavBar extends React.Component {

	render(){
		return (
			<ul className='nav'>
				<Link className="logo" to="/">Hacker Habitat</Link>
				<li><SearchBar /></li>
				<li>
					{ loggedIn() ? (
						<Link to='/signout' className='link'>Log Out</Link>
					) : (
						<Link to='/signin' className='link'>Log In</Link>
					)}
				</li>
				<li>
					{ loggedIn() ? (
	          <div></div>
					) : (
						<Link to='/signup' className='link'>Sign Up</Link>
					)}
				</li>
				<li>
					{ loggedIn() ? (
						<Link to="/createHouse" className='link'>Create House</Link>
					) : (
						<div></div>
					)}
        </li>
				<li>
					{ loggedIn() ? (
						<Link to='/createprofile' className='link'>Edit Profile</Link>
					) : (
						<div></div>
					)}
        </li>
				<li>
					{ loggedIn() ? (
						<Link to='/profile' className='link'>My Profile</Link>
					) : (
						<div></div>
					)}
        </li>
				<div>{this.props.children}</div>
    	</ul>
    );
	}
}


export default NavBar
