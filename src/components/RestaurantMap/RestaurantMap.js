import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import FilterInput from './FilterInput';
import RestuarantDot from './RestaurantDot';
import Map from './Map';

class RestuarantMap extends Component {
  
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

export default RestuarantMap;
