import { combineReducers } from 'redux';

const restaurantsRatingsReducer = (restaurants = [], action) => {

    switch(action.type){
        case "GET_RESTAURANTS_RATING":
            return action.payload;
        default:
            return restaurants;
    }
}

const selectedRestaurantReducer = (restaurant = null, action) => {
    switch(action.type){
        case "SELECTED_RESTAURANT":
            return {...action.payload};
        default:
            return restaurant;
    }
}

export default combineReducers({
    restaurantRatings : restaurantsRatingsReducer,
    selectedRestaurant : selectedRestaurantReducer
});