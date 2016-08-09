import React from 'react';
import HouseListing from './houseListing';
import { Link } from 'react-router';

class HouseList extends React.Component {
  constructor(props){
    super(props);

  }
  render(){
    return (
    <div className='list'>
      <div className='listHeading'><b>{ this.props.page === 'profile' ? 'Your Hacker Houses' : ' Search Results'}</b></div>
      {Array.isArray(this.props.houses) ? this.props.houses.map((house, i) => {
        return <HouseListing house={house} key={i} />
      }) : null}
    </div>
    )
  }
}
export default HouseList