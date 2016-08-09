import React, { Component } from 'react';
import NavBar from './navigationBar';

export default class FrontPage extends Component {
  render() {
    return (
      <div>
        <NavBar />
            <div className="filter">
              <div className="overlay">
                <h1 className="title">Hacker Habitat</h1>
                <p className="frontPageDescription">The tech industry is growing at a rapid pace, and more people than ever are relocating to take part in a fast paced industry. Hacker Habitat makes it possible for tech-minded people to find hacker-houses and live-work spaces for long and short term stays.</p><br/>
                <p className="frontPageDescription">Create your profile and start browsing!</p><br/>
                <p className="frontPageDescription">And if youre looking for roomates, create your profile and put your hacker-house on the map!</p>
              </div>
              <video autoPlay loop className="fillWidth">
                  <source src="assets/Working-it/Mp4/Working-it.mp4" type="video/mp4" />
                  <source src="assets/Working-it/Webm/Working-it.webm" type="video/webm" />
              </video>
            </div>
      }
      </div>
    )
  }
}
