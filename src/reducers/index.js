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

const mapCenterReducer = (center = {lat : -22.811961, lng : -43.2506787}, action) => {
    switch(action.type){
        case "SET_MAP_CENTER":
            return {...action.payload};
        default:
            return center;
    }
}

export default combineReducers({
    restaurantRatings : restaurantsRatingsReducer,
    restaurantWords : restaurantWordsReducer,
    selectedRestaurant : selectedRestaurantReducer,
    suggestions : suggestionsReducer,
    mapCenter : mapCenterReducer
});