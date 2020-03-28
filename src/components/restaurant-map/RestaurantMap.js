import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import FilterInput from './FilterInput';
import RestuarantDot from './RestaurantDot';
import Legend from './Legend';
import Map from './Map';

class RestuarantMap extends Component {
  render() {
    return (
      <div style={{ height: "100%", width: "100%" }}>
        <FilterInput></FilterInput>
        <Legend></Legend>
        <Map></Map>
      </div>
    );
  }
}

export default RestuarantMap;
