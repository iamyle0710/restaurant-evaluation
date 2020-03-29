import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";

import RestaurantDot from './RestaurantDot';

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            apiKey : '',
            center : {
                lng : -43.2506787,
                lat : -22.811961
            },
            zoom : 16
        }
    }
    render(){
        const markers = this.props.restaurants.map(restaurant => {
            return (
                <RestaurantDot 
                    key={restaurant.name} 
                    lat={restaurant.lat} 
                    lng={restaurant.lng} 
                    performance={restaurant.performance}
                >
                </RestaurantDot>
            )
        })
        return (
            <GoogleMapReact
                bootstrapURLKeys={{ key : 'AIzaSyDMmnhSuCd_f1MpYkwIrvqMZcFa2z_oHjc' }}
                defaultCenter={this.state.center}
                defaultZoom={this.state.zoom}
            >
                {markers}
            </GoogleMapReact>
        )
    }
}

export default Map;