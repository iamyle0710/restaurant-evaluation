import React from 'react';

import './SuggestItem.css';
import Rating from '../RestaurantDetail/Rating';

const SuggestItem = ({restaurant}) => {


    return (
        <div className="SuggestionItem">
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

export default SuggestItem;