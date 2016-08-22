import React, { Component }     from 'react';
import NavBar                   from '../navigationBar';

class MainContain extends Component {
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
