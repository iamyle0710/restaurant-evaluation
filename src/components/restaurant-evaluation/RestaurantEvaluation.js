import React, { Component } from "react";
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import './RestaurantEvaluation.css';
import Name from './restaurant-detail/Name';

import Performance from './restaurant-detail/Performance';

class RestaurantEvaluation extends Component {

    marginBottom = {
        header : "mb-3",
        cell : "mb-2"
    };

    render(){
        let restaurant = this.props.restaurant;

        if(!restaurant){
            return <div>Select a restaurant</div>
        }
        return(
            <Container fluid className="d-flex h-100 flex-column">
                <Row>
                    <Col sm={12} className={this.marginBottom.header}>
                        <Name name={restaurant.name} performance={restaurant.performance}></Name>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Row className={this.marginBottom.cell}>
                            <Col>
                                <span className="cellName">Performance</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Performance performance={restaurant.performance}></Performance>
                            </Col>
                        </Row>    
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return { restaurant : state.selectedRestaurant }
}

export default connect(mapStateToProps)(RestaurantEvaluation);