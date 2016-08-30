import React, { Component } from 'react';
import Tweet                from 'react-tweet';

class TwitterFeed extends Component {
  render() {
    return (
      <div className='twitter'>
      <div className='listHeading'><b>Twitter Feed</b></div>
      { this.props.tweets.length > 0 ? this.props.tweets.map((tweet, i) => {
        return (
          <Tweet key={i} data={ tweet } />
          )
      }) : null }
      </div>
    )
  }
}
export default TwitterFeed;