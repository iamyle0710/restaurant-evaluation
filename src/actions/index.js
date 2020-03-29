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
        const rst = response.data.map( restaurant => {
            restaurant["monthly_footprint"] = +restaurant["monthly_footprint"];
            restaurant["terminal"] = +restaurant["terminal"];
            restaurant["level"] = +restaurant["level"];
            restaurant["lat"] = +restaurant["lat"];
            restaurant["lng"] = +restaurant["lng"];
            return restaurant;
        })

        dispatch({
            type : "GET_RESTAURANTS_RATING",
            payload : rst
        });
    }
}