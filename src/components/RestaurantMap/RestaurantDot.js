import React, { Component } from 'react';
import { connect } from 'react-redux';

import {selectRestaurant} from '../../actions';
import './RestaurantDot.css';

class RestaurantDot extends Component {

    constructor(props){
        super(props);
        this.performanceStyle = {
            good : "good",
            median : "median",
            bad : "bad"
        }
    }
    

    render(){
        const restaurant = this.props.restaurant;
        const performanceStyle = this.performanceStyle[restaurant.performance.toLowerCase()];
        const selected = this.props.selected ? "selected" : "";
        return (
            <div className={["restaurantDot", performanceStyle, selected].join(" ")} onClick={() => this.props.selectRestaurant(restaurant)}>
                <div className="hoverInfo">
                    <div className="d-flex flex-row hoverInfoRow">
                        <span className="restaurantName">{restaurant.name}</span>
                        <span className="performance">{restaurant.performance}</span>
                    </div>
                    
                    <span className="arrowDown"></span>
                </div>
            </div>
        )
    }
}

export default connect(null, { selectRestaurant })(RestaurantDot);