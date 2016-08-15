import React       from 'react';
import { connect } from 'react-redux';
import SingleGMaps from './singleMap';
import MyCarousel  from './carousel';


class SingleListing extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }
  componentWillMount(){
    console.log(this.props.params)
    if(!this.props.listing){
      fetch('https://lit-harbor-15852.herokuapp.com/v1/listings/house/'+this.props.params.house_name)
      .then(results => results.json())
      .then(json => this.setState(json));
    }
  }
	render(){
		return <div>
        <div className='carousel'>
          <MyCarousel />
        </div>

        <div className="houseInfo">

  				<span className='houseName'>
            <b>{ this.props.listing ? this.props.listing.house_name : this.state.house_name }</b>
          </span><br/>

          <i>{ this.props.listing ? this.props.listing.heading : this.state.heading }</i><br/><br/>

          <b><i>Location:</i></b><br/>
          { this.props.listing ? this.props.listing.street_add : this.state.street_add }<br/>
          { this.props.listing ? this.props.listing.city : this.state.city },{ this.props.listing ? this.props.listing.state : null } { this.props.listing ? this.props.listing.zipcode : null }<br/><br/>

          <b><i>Price:</i></b> ${ this.props.listing ? this.props.listing.price : null } per night<br /><br/>

          <b><i>Vacancies:</i></b> { this.props.listing ? this.props.listing.vacancies : null } <br /><br />

          <b><i>Dates Available:</i></b> { this.props.listing ? this.props.listing.dates_avail : null } <br /><br />

          <b><i>House Interests:</i></b> { this.props.listing ? this.props.listing.house_interests.split(',').map((interest, i) => <span key={ i } >{ interest }, </span>) :  null }<br /><br />

          <b><i>House Mission:</i></b> { this.props.listing ? this.props.listing.house_mission : null } <br /><br />

          <b><i>House Rules:</i></b> { this.props.listing ? this.props.listing.house_rules : null } <br /><br />

          <b><i>Amenities:</i></b> { this.props.listing ? this.props.listing.amenities.split(',').map((amenity, i) => <span key={ i } >{ amenity }, </span>) :  null } <br /><br />

          <b><i>Primary Member:</i></b> { this.props.listing ? this.props.listing.primary_member : null } <br /><br />

          <form>
            <h4 className="contactHouse">
              <b>Contact { this.props.listing ? this.props.listing.house_name : 'Hacker House' }:</b>
            </h4>
            <label>Your Message:</label>
            <br />
            <textarea 
              style={ {width: '100%'} }
              ref={ (message) => this.message = message }>
            </textarea>
            <br/>
            <input 
              name='message' 
              type='submit' 
              onClick={ this.onSendMessage.bind(this) } 
              value='Send'/>
          </form>

        </div>

        <SingleGMaps />

			</div>
	}

    onSendMessage(e){
      e.preventDefault();

      let sender;
      let receiver;
      let username;
      let listing = "no name"
      let message = this.message.value
      let userID = window.localStorage.getItem('userID');

      fetch('http://localhost:3001/v1/users/?id=' + userID)
      .then(response => response.json())
      .then(json => {
        if(json.data[0]){
          username = json.data[0].username
          sender = json.data[0].email
        } else {
          alert("You Must Be Signed in to send a message")
        }
        receiver = this.props.listing.user.email
        if(this.props.listing.house_name){
          listing = this.props.listing.house_name
        }
      })
      .then(() => { 
        fetch('/email', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({personalizations: [{to: [{email: receiver}]}],from: {email: sender},subject: username + " is interested in " + listing + " on Hacker Habitat" ,content: [{type: "text/plain", value: message}]})
        }).then(res => {
        if(res.status === 202){
          alert("Your Message was Sent")
        } else {
          alert("Your Message Could Not Be Sent")
        }
      })
    })
  }
}

function mapStateToProps(state) {
  return {
    listing: state.listings.singleListing
  }
}

export default connect(mapStateToProps)(SingleListing);
