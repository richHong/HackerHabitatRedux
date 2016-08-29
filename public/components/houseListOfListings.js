import React, { Component } from 'react';
import HouseListing         from './houseListing';
import { Link }             from 'react-router';

class HouseList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div className='list'>
      <div className='listHeading'><b>{ this.props.page === 'profile' ? 'Your Hacker Houses' : ' Search Results'}</b></div>
      { Array.isArray(this.props.houses) && this.props.houses.length > 0 ? this.props.houses.map((house, i) => {
        return <HouseListing 
                  house={ house } 
                  key={ i } />
      }) : <div className='noResults'>No Results</div>}
    </div>
    )
  }
}
export default HouseList;