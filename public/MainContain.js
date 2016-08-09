import React from 'react';
import SearchBar from './SearchBar';
import NavBar from './navigationBar';

class MainContain extends React.Component {
	render(){
		return (
      <div>
      	<NavBar />
				{this.props.children}
			</div>
		)
	}
}

export default MainContain
