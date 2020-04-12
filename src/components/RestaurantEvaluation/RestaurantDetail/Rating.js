import React, { Component } from 'react';

import './Rating.css';
class Rating extends Component {
    
    renderStars(){
        let starWidgets = [];
        let isChecked = "";
        
        for(let i = 1; i < 6; i++){
            isChecked = this.props.socialRating >= i ? "checked" : "";
            starWidgets.push(<span key={i} className={"ratingStar fa fa-star " + isChecked}></span>);
        }
        return starWidgets;
    }

    render(){
        return (
            <div className="d-flex flex-row" style={{flexWrap: "wrap", margin: "10px 0"}}>
                <div className="ratingWidget">
                    {this.renderStars()}
                </div>
                <div className="rating">
                    {this.props.socialRating}
                </div>
                <div className="ratingQuantity">
                    based on {this.props.numberOfRatings} reviews
                </div>
                
            </div>
        )
    }
    
}

export default Rating;