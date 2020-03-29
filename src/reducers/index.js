import { combineReducers } from 'redux';

const restaurantsRatingsReducer = (restaurants = [], action) => {

    switch(action.type){
        case "GET_RESTAURANTS_RATING":
            return action.payload;
        default:
            return restaurants;
    }
}

export default combineReducers({
    restaurant_ratings : restaurantsRatingsReducer
});