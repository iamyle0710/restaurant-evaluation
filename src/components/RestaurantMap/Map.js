import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from 'react-redux';

import RestaurantDot from "./RestaurantDot";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lng: -43.2506787,
        lat: -22.811961
      },
      marker : null,
      zoom: 16
    };
  }

  componentDidUpdate(prevProps){
    if(prevProps.center !== this.props.center){
      const center = this.props.center;
      this.map.setCenter({
        lat : center.lat,
        lng : center.lng
      });

      this.clearMarkers();

      if(center.lat !== this.state.center.lat || center.lng !== this.state.center.lng){
        this.addMarker();
      }
    }
  }

  clearMarkers(){
    if(this.state.marker){
      this.state.marker.setMap(null);
      this.setState({
        marker : null
      })
    }
  }

  addMarker(){
    var marker = new this.maps.Marker({
      position : {
        lat : this.props.center.lat,
        lng : this.props.center.lng
      },
      animation: this.maps.Animation.DROP,
      map : this.map
    });

    this.setState({
      marker : marker
    })
    
  }

  render() {
    let selected = this.props.selectedRestaurant || {};
    const markers = this.props.restaurants.map(restaurant => {
      return (
        <RestaurantDot
          key={restaurant.name}
          lat={restaurant.lat}
          lng={restaurant.lng}
          restaurant={restaurant}
          selected={selected && restaurant.name === selected.name}
        ></RestaurantDot>
      );
    });
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({map, maps}) => {
          map.setOptions({
            clickableIcons : false,
            disableDefaultUI : true
          })
          this.map = map;
          this.maps = maps;
          console.log("loaded ", map, maps)
        }}
      >
        {markers}
      </GoogleMapReact>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    center : state.mapCenter
  }
}
export default connect(mapStateToProps)(Map);
