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
                    day : indexToDay[index],
                    value : +value
                }
            })
            return restaurant;
        })

        dispatch({
            type : "GET_RESTAURANTS_RATING",
            payload : rst
        });
    }
};

export const selectRestaurant = (restaurant) => {
    return {
        type : "SELECTED_RESTAURANT",
        payload : restaurant
    }
};