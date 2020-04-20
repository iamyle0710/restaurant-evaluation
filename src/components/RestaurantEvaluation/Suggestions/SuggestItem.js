import React from 'react';
import { setMapCenter } from '../../../actions';
import { connect } from 'react-redux';

import './SuggestItem.css';
import Rating from '../RestaurantDetail/Rating';


class SuggestItem extends React.Component{

    onMouseEnterItem = () => {
        this.props.setMapCenter(this.props.restaurant.lat, this.props.restaurant.lng);
    }

    onMouseLeaveItem = () => {
        this.props.setMapCenter();
    }

    render(){
        const restaurant = this.props.restaurant;
        // console.log(restaurant);
        return (
            <div className="SuggestionItem" onMouseEnter={() => this.onMouseEnterItem()} onMouseLeave={() => this.onMouseLeaveItem()}>
                <img src={restaurant.img_url} alt={restaurant.name}></img>
                <div className="hoverContent flex-column">
                    <div className="mask">
                        <span className="itemName">{restaurant.name}</span>
                        <div className="itemRow d-flex">
                            <div className='performance'>{restaurant.performance}</div>
                            <div className="d-flex flex-column">
                                <div className="d-flex">Cuisine : {restaurant.cuisine}</div>
                                <Rating socialRating={restaurant.ratings} numberOfRatings={restaurant.number_of_reviews}></Rating>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
    
}

export default connect(null, {setMapCenter})(SuggestItem);