import axios from 'axios';

/**
 * Get the airport restaurant rating
 * @return [{
 *      name: string 
 *      monthly_footprint: number
 *      performance: string
 *      terminal: number
 *      level: number
 *      longitude: number
 *      latitutde: number
 * }]
 */
export const getRestaurantsRating = () => {    
    return async (dispatch) => {
        const response = await axios.get("./assets/restaurant_rating.json");
        const indexToDay = { 0 : "Mon", 1 : "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat", 6 : "Sun"};
        const rst = response.data.map( restaurant => {
            restaurant["monthly_footprint"] = +restaurant["monthly_footprint"];
            restaurant["social_rating"] = +restaurant["social_rating"];
            restaurant["number_of_ratings"] = +restaurant["number_of_ratings"];
            restaurant["terminal"] = +restaurant["terminal"];
            restaurant["level"] = +restaurant["level"];
            restaurant["lat"] = +restaurant["lat"];
            restaurant["lng"] = +restaurant["lng"];
            restaurant["daily_footprints"] = restaurant["daily_footprints"].map((value, index) => {
                return { 
                    name : indexToDay[index],
                    value : +value
                }
            });
            restaurant["footprint_percentage"] = [{
                name : "current restaurant",
                value : restaurant["monthly_footprint"]
            }, {
                name : "other restaurants",
                value : restaurant["total_monthly_footprint"] - restaurant["monthly_footprint"]
            }]
            return restaurant;
        })

        dispatch({
            type : "GET_RESTAURANTS_RATING",
            payload : rst
        });
    }
};

export const getRestaurantWords = () => {
    return async (dispatch) => {
        const response = await axios.get("/assets/restaurant_tfidf.json");
        const rst = response.data;
        // console.log(rst);
        dispatch({
            type : "GET_RESTAURANT_WORDS",
            payload : rst
        })
    }
}

export const getSuggestions = () => {
    return async (dispatch) => {
        const response = await axios.get("/assets/brazil_restaurant_rating.json");
        const rst = response.data.map(restaurant => {
            restaurant["number_of_reviews"] = +restaurant["number_of_reviews"];
            restaurant["ratings"] = +restaurant["ratings"];
            restaurant["lat"] = +restaurant["lat"];
            restaurant["lng"] = +restaurant["lng"];
            return restaurant;
        });
        // console.log(rst);
        dispatch({
            type : "GET_RESTAURANT_SUGGESTIONS",
            payload : rst
        })
    }
}

export const selectRestaurant = (restaurant) => {
    return {
        type : "SELECTED_RESTAURANT",
        payload : restaurant
    }
};

export const setMapCenter = (lat= -22.811961, lng= -43.2506787) => {
    return {
        type : "SET_MAP_CENTER",
        payload : {
            lat : lat,
            lng : lng
        }
    }
}
