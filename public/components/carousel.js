import React, { Component }                        from 'react';
import { Carousel, CarouselItem, CarouselCaption, Image } from 'react-bootstrap';
import { connect }                               from 'react-redux';

class MyCarousel extends Component {
  constructor(props){
    super(props);
    this.state = {images:[]};
  }
  componentWillMount(){
    let images = [];
    if (this.props.listing){
      if(this.props.listing.pic1){
        images.push(this.props.listing.pic1);
      }
      if(this.props.listing.pic2){
        images.push(this.props.listing.pic2);
      }
      if(this.props.listing.pic3){
        images.push(this.props.listing.pic3);
      }
      if(this.props.listing.pic4){
        images.push(this.props.listing.pic4);
      }
      if(this.props.listing.pic5){
        images.push(this.props.listing.pic5);
      }
      this.setState({images});
    } 
  }
  componentDidMount(){
    let images = [];
    if (this.state.images.length === 0){
        images.push('http://assets.inhabitat.com/files/2010/01/interloop-stock.jpg');
        images.push('http://i.istockimg.com/file_thumbview_approve/88947009/6/stock-photo-88947009-swimming-pool-mit-apartment-houses-in-the-background.jpg');
        this.setState({images});
    }

  }
  render() {
    return (
      <Carousel
        interval={3000}>
        {this.state.images.map((img, i) => {
          return (
          <CarouselItem
            className='carouselItem' 
            key ={ i }>
            <img
              className='carouselImage'
              src={ img } />
          </CarouselItem>
          )
        })}
      </Carousel>
    )
  }
};
function mapStateToProps(state) {
  return {
    listing: state.listings.singleListing
  };
};
export default connect(mapStateToProps)(MyCarousel);
