import React from 'react';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/navigationBar';

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

export default MainContain;
