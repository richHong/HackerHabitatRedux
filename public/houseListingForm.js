import React from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';
import Axios from 'axios';

class HousingForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      interestsArray:['Music', 'Movies', 'Books', 'Fashion', 'Outdoors', 'Sports', 'Crafting', 'Gaming','Javascript','Ruby', 'Node', 'React', 'Angular', 'Express', 'MongoDB', 'Postgres','Redux', 'Cooking', 'Camping', 'PHP', 'C++', 'iOS', 'Android', 'Java'],
      houseInterests:[],
      amenitiesArray:['Washer', 'Dryer', 'Cats Allowed', 'Dogs Allowed', 'Dishwasher', 'Garage', 'Gym', 'Mailroom','Wifi', 'Meeting Room/Lounge'],
      houseAmenities:[]
    };

    this.addInterest = this.addInterest.bind(this);
    this.addAmenity = this.addAmenity.bind(this);
    this.submit = this.submit.bind(this);
  }

  addAmenity (value){

    if (this.state.houseAmenities.includes(value)){
      this.state.houseAmenities.forEach((interest, index, list) => {
        list.splice(index,1);
      });
    } else {
      this.state.houseAmenities.push(value);
    }
  }

  addInterest (value){

    if (this.state.houseInterests.includes(value)){
      this.state.houseInterests.forEach((interest, index, list) => {
        list.splice(index,1);
      });
    } else {
      this.state.houseInterests.push(value);
    }
  }

  submit(e, name, heading, street, city, state, zipCode, price, dateStart, dateEnd, interests, mission, rules, vacancies, primary, amenities, pic1, pic2, pic3, pic4, pic5){
    e.preventDefault();

    let geolocation;
    let authToken = window.localStorage.getItem('token');

    let pic1Name;
    let pic2Name;
    let pic3Name;
    let pic4Name;
    let pic5Name;

    if (pic1.value === ''){
      pic1Name = pic1.value;
    } else {
      pic1Name = 'https://s3-us-west-1.amazonaws.com/hackerhabitatlistings/'+pic1.value.slice(12);
      var form = document.getElementById('pic1Form');
      var fdata = new FormData(form);
      Axios.post('http://localhost:3000/v1/lp', fdata)
    }

    if (pic2.value === ''){
      pic2Name = pic2.value;
    } else {
      pic2Name = 'https://s3-us-west-1.amazonaws.com/hackerhabitatlistings/'+pic2.value.slice(12);
      var form = document.getElementById('pic2Form');
      var fdata = new FormData(form);
      Axios.post('http://localhost:3000/v1/lp', fdata)
      .then(response => console.log(response));
    }

    if (pic3.value === ''){
      pic3Name = pic3.value;
    } else {
      pic3Name = 'https://s3-us-west-1.amazonaws.com/hackerhabitatlistings/'+pic3.value.slice(12);
      var form = document.getElementById('pic3Form');
      var fdata = new FormData(form);
      Axios.post('http://localhost:3000/v1/lp', fdata)
    }

    if (pic4.value === ''){
      pic4Name = pic4.value;
    } else {
      pic4Name = 'https://s3-us-west-1.amazonaws.com/hackerhabitatlistings/'+pic4.value.slice(12);
      var form = document.getElementById('pic4Form');
      var fdata = new FormData(form);
      Axios.post('http://localhost:3000/v1/lp', fdata)
    }

    if (pic5.value === ''){
      pic5Name = pic5.value;
    } else {
      pic5Name = 'https://s3-us-west-1.amazonaws.com/hackerhabitatlistings/'+pic5.value.slice(12);
      var form = document.getElementById('pic5Form');
      var fdata = new FormData(form);
      Axios.post('http://localhost:3000/v1/lp', fdata)
    }

    fetch('http://maps.googleapis.com/maps/api/geocode/json?address='+street.value+'+'+city.value+'+'+state.value)
    .then(response => response.json())
    .then(json => geolocation = json.results[0].geometry.location)
    .then(() => {
      fetch('http://localhost:3001/v1/listings?access_token='+authToken, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            house_name: name.value,
            heading: heading.value,
            street_add: street.value,
            city: city.value.toLowerCase(),
            state: state.value,
            zipcode: zipCode.value,
            price: price.value,
            dates_avail: dateStart.value+' to '+dateEnd.value,
            house_interests: interests.value+this.state.houseInterests,
            house_mission: mission.value,
            house_rules: rules.value,
            vacancies: vacancies.value,
            primary_member: primary.value,
            amenities: amenities.value+this.state.houseAmenities,
            lat: geolocation.lat,
            lng: geolocation.lng,
            pic1: pic1Name,
            pic2: pic2Name,
            pic3: pic3Name,
            pic4: pic4Name,
            pic5: pic5Name
        })
      })
      .then(response => response.json())
      .then(json => hashHistory.push('/results'));
    });
  }

  render(){
    return(
          <div className="listingForm">
            <h1>CREATE A HACKER HOUSE</h1>
          <form>
            <label>House Name:</label><br/>
              <input type='text'ref={input => this.house_name = input}/><br/>

            <label>Heading:</label><br/>
              <input type='text'ref={input => this.heading = input}/><br/>

            <label>Street Address:</label><br/>
              <input type='text'ref={input => this.street_add = input}/><br/>

            <label>City:</label><br/>
              <input type='text'ref={input => this.city = input}/><br/>

            <label>State:</label><br/>
              <input type='text'maxLength='2'ref={input => this.stateName = input}/><br/>

            <label>Zipcode:</label><br/>
              <input type='text'pattern="\d*" maxLength='5' min='0'ref={input => this.zipCode = input}/><br/>

            <label>Price:</label><br/>
              <input type="number" name="currency" min="0" max="9999" step="0.01" ref={input => this.price = input}/><br/>

            <label>Dates Available:</label><br/>
              <input type="date"ref={input => this.dates_start = input}/><input type="date"ref={input => this.dates_end = input}/><br/>

            <label>Interests:</label><br/>
              <input type='text'ref={input => this.interests = input}/><br/>
              <div>
              {this.state.interestsArray.map((value, i) => {
                return (
                  <div key={i} className="checkboxItem">
                    <input type="checkbox" onChange={e => this.addInterest(value)} />
                    <span> {value} </span>
                  </div>
                  )
              })}
              </div><br/><br/><br/><br/><br/><br/>

            <label>Mission Statement:</label><br/>
              <textarea ref={input => this.house_mission = input}/><br/>

            <label>House Rules:</label><br/>
              <textarea ref={input => this.house_rules = input}/><br/>

            <label>Number of Vacancies:</label><br/>
              <input type="number" min='0' ref={input => this.vacancies = input}/><br/>

            <label>Primary Member:</label><br/>
              <input type='text'ref={input => this.primary_member = input}/><br/>

            <label>Amenities:</label><br/>
              <input type='text'ref={input => this.amenities = input}/><br/>
              <div>
                {this.state.amenitiesArray.map((value, i) => {
                return (
                  <div key={i} className="checkboxItem">
                    <input type="checkbox" onChange={e => this.addAmenity(value)} />
                    <span> {value} </span>
                  </div>
                  )
              })}
              </div><br/><br/><br/>
          </form>

            <form id='pic1Form'>
              <label>Upload Picture 1:</label><br/>
              <input type='file' name='file' className='fileUpload'ref={input => this.pic1 = input} />
            </form>

            <form id='pic2Form'>
              <label>Upload Picture 2:</label><br/>
              <input type='file' name='file' className='fileUpload'ref={input => this.pic2 = input} />
            </form>

            <form id='pic3Form'>
              <label>Upload Picture 3:</label><br/>
              <input type='file' name='file' className='fileUpload'ref={input => this.pic3 = input} />
            </form>

            <form id='pic4Form'>
              <label>Upload Picture 4:</label><br/>
              <input type='file' name='file' className='fileUpload'ref={input => this.pic4 = input} />
            </form>

            <form id='pic5Form'>
              <label>Upload Picture 5:</label><br/>
              <input type='file' name='file' className='fileUpload'ref={input => this.pic5 = input} />
            </form><br/>

            <input id='housingSubmit' onClick={e => this.submit(e, this.house_name, this.heading, this.street_add, this.city, this.stateName, this.zipCode, this.price, this.dates_start, this.dates_end, this.interests, this.house_mission, this.house_rules, this.vacancies, this.primary_member, this.amenities, this.pic1, this.pic2, this.pic3, this.pic4, this.pic5)} type='button' value='Create House'/>
        </div>
      )
  }
}

export default HousingForm
