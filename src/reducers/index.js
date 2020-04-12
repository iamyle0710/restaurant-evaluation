import { combineReducers } from 'redux';

const restaurantsRatingsReducer = (restaurants = [], action) => {

    switch(action.type){
        case "GET_RESTAURANTS_RATING":
            return action.payload;
        default:
            return restaurants;
    }
}

const restaurantWordsReducer = ( restaurants = {}, action) => {
    switch(action.type){
        case "GET_RESTAURANT_WORDS":
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

const suggestionsReducer = (restaurants = [], action) => {
    switch(action.type){
        case "GET_RESTAURANT_SUGGESTIONS":
            return [...action.payload];
        default:
            return restaurants;
    }
}

export default combineReducers({
    restaurantRatings : restaurantsRatingsReducer,
    restaurantWords : restaurantWordsReducer,
    selectedRestaurant : selectedRestaurantReducer,
    suggestions : suggestionsReducer
});