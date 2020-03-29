import React, { Component } from 'react';
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
        const performanceStyle = this.performanceStyle[this.props.performance.toLowerCase()];
        return (
            <div className={"restaurantDot " + performanceStyle}>
                {this.props.performance}
            </div>
        )
    }
}

export default RestaurantDot;