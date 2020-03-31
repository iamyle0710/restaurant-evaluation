import React, { Component } from "react";
import { Container, Col, Row, ListGroup, Badge } from 'react-bootstrap';

import './RestaurantEvaluation.css';
import Name from './RestaurantDetail/Name';
import Rating from './RestaurantDetail/Rating';
import Barchart from './Chart/BarChart';

class RestaurantEvaluation extends Component {

    marginBottom = {
        header : "mb-0",
        cell : "mb-2"
    };

    renderSuggestions (){
        let rst = [];
        for(var i = 0; i < 15; i++){
            rst.push(<ListGroup.Item key={i}><Badge variant="secondary" style={{ marginRight: "10px"}}>Good</Badge>Restaurant {i}</ListGroup.Item>)
        };
        return rst;
    }
    render(){
        let restaurant = this.props.selectedRestaurant;

        if(!restaurant){
            return <div>Select a restaurant</div>
        }
        return(
            <Container fluid className="d-flex h-100 flex-column" style={{position: "relative", height: "100%"}}>
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
                <Row style={{borderBottom: "1px solid #ddd", paddingBottom: "20px"}}>
                    <Col sm={4}>
                        <Row className="mt-3">
                            <Col sm={12}>
                                <span className="cellName">Footprint(%)</span>
                                <div style={{background: "#ddd", height: "150px"}}>Pie chart</div>
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
                <Row style={{borderBottom: "1px solid #ddd", paddingBottom: "20px", overflow:"auto"}}>
                    <Col sm={12}>
                        <Row className="mt-3">
                            <Col sm={12}>
                                <span className="cellName">Restaurant Suggestion</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <ListGroup>
                                    {this.renderSuggestions()}
                                </ListGroup>
                            </Col>    
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default RestaurantEvaluation;