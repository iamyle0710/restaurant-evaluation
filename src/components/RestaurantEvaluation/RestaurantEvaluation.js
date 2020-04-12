import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';

import './RestaurantEvaluation.css';
import Name from './RestaurantDetail/Name';
import Rating from './RestaurantDetail/Rating';
import Barchart from './Chart/BarChart';
import Footprint from './Chart/Footprint';
import WordCloud from './Chart/WordCloud';
import SuggestList from './Suggestions/SuggestList';

class RestaurantEvaluation extends Component {

    marginBottom = {
        header : "mb-0",
        cell : "mb-2"
    };

    
    render(){
        let restaurant = this.props.selectedRestaurant;
        let suggestions = this.props.suggestions;

        if(!restaurant){
            return <div>Select a restaurant</div>
        }

        return(
            <Container fluid className="d-flex h-100 flex-column" style={{position: "relative", height: "100%", overflow: "auto"}}>
                <Row>
                    <Col sm={12} className={this.marginBottom.header}>
                        <Name name={restaurant.name}></Name>
                    </Col>
                </Row>
                <Row style={{borderBottom: "1px solid #ddd", paddingBottom: "20px"}}>
                    <Col sm={12}>
                        <Rating 
                            socialRating={restaurant.social_rating}
                            numberOfRatings={restaurant.number_of_ratings}
                        ></Rating> 
                    </Col>
                </Row>
                <Row className="d-flex flex-column mt-3" style={{borderBottom: "1px solid #ddd", minHeight:"200px"}}>
                    <Col sm={12} className="d-flex flex-column pb-3">
                        <span className="cellName">Reviews</span>
                        <WordCloud words={this.props.words}></WordCloud>
                    </Col>
                </Row>
                <Row style={{borderBottom: "1px solid #ddd", paddingBottom: "20px"}}>
                    <Col sm={4}>
                        <Row className="mt-3">
                            <Col sm={12}>
                                <span className="cellName mb-2">Footprint(%)</span>
                                <div style={{height: "200px"}}>
                                    <Footprint data={[restaurant.monthly_footprint, restaurant.total_monthly_footprint]}></Footprint>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={8}>
                        <Row className="mt-3">
                            <Col sm={12}>
                                <span className="cellName">Weekday Traffic</span>
                                <div style={{height: "200px"}}>
                                    <Barchart data={restaurant.daily_footprints} xLabel="Day" yLabel="Customers"></Barchart>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{borderBottom: "1px solid #ddd", paddingBottom: "20px", overflow:"auto", minHeight:"400px"}}>
                    <Col sm={12}>
                        <Row className="mt-3 mb-3">
                            <Col sm={12}>
                                <span className="cellName">Restaurant Suggestion</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <SuggestList performance={restaurant.performance} suggestions={suggestions}></SuggestList>
                            </Col>    
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RestaurantEvaluation;