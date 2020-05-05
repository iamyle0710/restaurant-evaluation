import React, { Component } from "react";

import Map from './Map';
import Legend from './Legend';

class RestuarantMap extends Component {
  
  // legendTypes = [{"name" : "Bad", "color" : "#ff2f2f"}, {"name" : "Median", "color" : "#a2a2a2"}, {"name" : "Good", "color" : "#d7f243"}]
  legendTypes = [{"name" : "Bad", "color" : "#cd5858"}, {"name" : "Median", "color" : "#F4A460"}, {"name" : "Good", "color" : "#FF8000"}]
  
  render() {
    let restaurants = this.props.restaurantRatings || [];

    return (
      <div style={{ height: "100%", width: "100%", position: "relative"}}>
        <Map 
          restaurants={restaurants} 
          selectedRestaurant={this.props.selectedRestaurant || null}>
          
          </Map>
        <Legend title="Performance" types={this.legendTypes}></Legend>
      </div>
    );
  }
}

export default RestuarantMap;
