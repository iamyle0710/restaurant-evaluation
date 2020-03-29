import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from 'react-redux';

import { getRestaurantsRating } from '../../actions';
import FilterInput from './FilterInput';
import RestuarantDot from './RestaurantDot';
import Legend from './Legend';
import Map from './Map';

class RestuarantMap extends Component {
  
  componentDidMount(){
    this.props.getRestaurantsRating();
  }
  render() {
    let restaurants = this.props.restaurantRatings || [];

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <Map 
          restaurants={restaurants} 
          selectedRestaurant={this.props.selectedRestaurant || null}></Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { 
    restaurantRatings : state.restaurantRatings,
    selectedRestaurant : state.selectedRestaurant
  };
}

export default connect(mapStateToProps, {getRestaurantsRating})(RestuarantMap);
