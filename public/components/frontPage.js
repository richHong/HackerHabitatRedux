import React, { Component } from 'react';
import NavBar               from './navigationBar';
import { connect }          from 'react-redux';
import { getHouseAction }   from '../actions/houseActions';
import { hashHistory }      from 'react-router';

class FrontPage extends Component {
  onSubmit(city){
    fetch('/v1/listings/city/:'+city)
      .then(response => response.json())
      .then(json => {
        this.props.dispatch(getHouseAction(json));
        hashHistory.push('results');
      });
  }
  render() {
    return (
      <div>
        <NavBar />
          <div className="filter">
            <div className="overlay">
              <h1 className="bigTitle">Hacker Habitat</h1>
              <p className="frontPageDescription">The tech industry is growing at a rapid pace, and more people than ever are relocating to take part in a fast paced industry. Hacker Habitat makes it possible for tech-minded people to find hacker-houses and live-work spaces for long and short term stays.</p>
              <br/>
              <p className="frontPageDescription">Create your profile and start browsing!</p>
              <br/>
              <p className="frontPageDescription">And if youre looking for roomates, create your profile and put your hacker-house on the map!</p>
            </div>
      
            <video autoPlay loop>
                <source 
                  src="assets/Home-work/Mp4/Home-work.mp4" 
                  type="video/mp4" />
                <source 
                  src="assets/Home-work/Webm/Home-work.webm" 
                  type="video/webm" />
            </video>
          </div>

          <div className='destinations' ><h1 className="title">Common Destinations:</h1></div>
          <div className='sanFrancisco' onClick={ () => this.onSubmit('san+francisco') }>San Francisco</div>
          <div className='oakland' onClick={ () => this.onSubmit('oakland') }>Oakland</div>
          <div className='sanJose' onClick={ () => this.onSubmit('san+jose') }>San Jose</div>

      </div>
    )
  }
}
export default connect()(FrontPage);