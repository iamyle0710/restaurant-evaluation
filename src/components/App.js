import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import './App.css';
import HeaderRow from './header/HeaderRow';
import RestuarantMap from './restaurant-map/RestaurantMap';
import RestaurantEvaluation from './restaurant-evaluation/RestaurantEvaluation';

const API_KEY =`${process.env.GOOGLE_MAP_API}`;
console.log("API", API_KEY);

const App = () => {
    return (
        <Container fluid className="d-flex h-100 flex-column">
            <Row>
                <Col>
                    <HeaderRow></HeaderRow>
                </Col>  
            </Row>
            <Row className="flex-grow-1">
                <Col sm={8}>
                    <RestuarantMap></RestuarantMap>
                </Col>
                <Col sm={4} className="ml-0 pl-0">
                    <RestaurantEvaluation></RestaurantEvaluation>
                </Col>
            </Row>
        </Container>
    )
}

export default App;