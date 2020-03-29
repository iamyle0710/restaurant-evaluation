import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";

import RestaurantDot from './RestaurantDot';

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiKey : 'AIzaSyDMmnhSuCd_f1MpYkwIrvqMZcFa2z_oHjc',
            center : {
                lng : -43.2506787,
                lat : -22.811961
            },
            zoom : 16
        }
    }
    render(){
        let selected = this.props.selectedRestaurant;
        const markers = this.props.restaurants.map(restaurant => {
            return (
                <RestaurantDot 
                    key={restaurant.name} 
                    lat={restaurant.lat} 
                    lng={restaurant.lng} 
                    restaurant={restaurant}
                    selected={selected && restaurant.name === selected.name}
                >
                </RestaurantDot>
            )
        })
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key : '' }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
            >
                {markers}
            </GoogleMapReact>
        )
    }
}

export default Map;