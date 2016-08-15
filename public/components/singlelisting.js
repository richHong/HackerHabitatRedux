import React       from 'react';
import { connect } from 'react-redux';
import SingleGMaps from './singleMap';
import MyCarousel  from './carousel';


class SingleListing extends React.Component {
  constructor(props){
    super(props);
    this.state={
      house_name: '',
      heading: '',
      street_add: '',
      city: '',
      state: '',
      zipcode: '',
      price: 0,
      dates_avail: new Date(),
      house_interests: '',
      house_mission: '',
      house_rules: '',
      vacancies: 0,
      primary_member: '',
      amenities: '',
      lat: '',
      lng: '',
      pic1: '',
      pic2: '',
      pic3: '',
      pic4: '',
      pic5: ''
    };
  }
  componentWillMount(){
      console.log('Finding refreshed house');
      let that = this;
      fetch('https://lit-harbor-15852.herokuapp.com/v1/listings/house/'+this.props.params.house_name)
      .then(results => results.json())
      .then(json => {
        this.setState(json);
        console.log(this.state);
      });
  }
	render(){
    console.log('Props', this.props);
    console.log('State', this.state);
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
          { this.props.listing ? this.props.listing.city : this.state.city },{ this.props.listing ? this.props.listing.state : this.state.state } { this.props.listing ? this.props.listing.zipcode : this.state.zipcode }<br/><br/>

          <b><i>Price:</i></b> ${ this.props.listing ? this.props.listing.price : this.state.price } per night<br /><br/>

          <b><i>Vacancies:</i></b> { this.props.listing ? this.props.listing.vacancies : this.state.vacancies } <br /><br />

          <b><i>Dates Available:</i></b> { this.props.listing ? this.props.listing.dates_avail : this.state.dates_avail } <br /><br />

          <b><i>House Interests:</i></b> { this.props.listing ? this.props.listing.house_interests.split(',').map((interest, i) => <span key={ i } >{ interest }, </span>) : this.state.house_interests.split(',').map((interest, i) => <span key={ i } >{ interest }, </span>)  }<br /><br />

          <b><i>House Mission:</i></b> { this.props.listing ? this.props.listing.house_mission : this.state.house_mission } <br /><br />

          <b><i>House Rules:</i></b> { this.props.listing ? this.props.listing.house_rules : this.state.house_rules } <br /><br />

          <b><i>Amenities:</i></b> { this.props.listing ? this.props.listing.amenities.split(',').map((amenity, i) => <span key={ i } >{ amenity }, </span>) : this.state.amenities.split(',').map((amenity, i) => <span key={ i } >{ amenity }, </span>) } <br /><br />

          <b><i>Primary Member:</i></b> { this.props.listing ? this.props.listing.primary_member : this.state.primary_member } <br /><br />

          <form>
            <h4 className="contactHouse">
              <b>Contact { this.props.listing ? this.props.listing.house_name : this.state.house_name }:</b>
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

      fetch('https://lit-harbor-15852.herokuapp.com/v1/users/' + userID)
      .then(response => response.json())
      .then(json => {
        if(json){
          username = json.username
          sender = json.email
        } else {
          alert("You Must Be Signed in to send a message")
        }
        receiver = this.props.listing.user.email || this.state.user.email
        if(this.props.listing.house_name || this.state.house_name){
          listing = this.props.listing.house_name || this.state.house_name
        }
      })
      .then(() => { 
        fetch('https://lit-harbor-15852.herokuapp.com/email', {
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
