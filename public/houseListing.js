import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux'
import { singleListingAction } from "./houseActions"

class HouseListing extends React.Component {
    render(){
		return (
        <div className='listingBorder'>  	

			<Link className='singleListing' to="/singlelisting" onClick={this.getSingleListing.bind(this)}>

        		<img className='housePic' src={this.props.house.pic1 || 'https://openclipart.org/image/2400px/svg_to_png/170529/pib-dark.png'} />
        		
                <span className='houseName'><b>{this.props.house.house_name}</b></span><br/>
        		
                <i>{this.props.house.heading}</i><br/><br/>
        		
                <b>Location:</b><br/>
        		{this.props.house.street_add}<br/>
        		{this.props.house.city},{this.props.house.state} {this.props.house.zipcode}<br/>
        		
                <span className='price'><b>Price:</b> ${this.props.house.price} per night</span><br />
    		</Link>
    	</div>
        )
	}
	getSingleListing(){
		this.props.singleListingAction(this.props.house)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({singleListingAction: singleListingAction}, dispatch)
}

function mapStateToProps(state) {
  return {
    singlelisting: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseListing);

