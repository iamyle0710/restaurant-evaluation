import React, {Component} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import './App.css';
import { getRestaurantsRating } from '../actions';
import HeaderRow from './Header/HeaderRow';
import RestuarantMap from './RestaurantMap/RestaurantMap';
import RestaurantEvaluation from './RestaurantEvaluation/RestaurantEvaluation';

class App extends Component {

    componentDidMount(){
        this.props.getRestaurantsRating();
    }

    render(){
        let restaurantRatings = this.props.restaurantRatings || [];
        let selectedRestaurant = this.props.selectedRestaurant || null;
    
        if(!selectedRestaurant){
            return (
                <Container fluid className="d-flex h-100 flex-column">
                    <Row>
                        <Col>
                            <HeaderRow></HeaderRow>
                        </Col>  
                    </Row>
                    <Row className="flex-grow-1">
                        <Col sm={12} lg={12}>
                            <RestuarantMap 
                                restaurantRatings={restaurantRatings}
                                selectedRestaurant={selectedRestaurant}
                            ></RestuarantMap>
                        </Col>
                    </Row>
                </Container>
            )
        }
    
        return (
            <Container fluid className="d-flex flex-column" style={{position: "relative", height: "100%"}}>
                <Row style={{position: "relative"}}>
                    <Col>
                        <HeaderRow></HeaderRow>
                    </Col>  
                </Row>
                <Row style={{position: "relative", height: "100%", overflow:"hidden"}}>
                    <Col sm={6} lg={8} style={{position: "relative", height: "100%"}}>
                        <RestuarantMap 
                            restaurantRatings={restaurantRatings}
                            selectedRestaurant={selectedRestaurant}
                        ></RestuarantMap>
                    </Col>
                    <Col sm={6} lg={4} className="ml-0 pl-0" style={{position: "relative", height: "100%"}}>
                        <RestaurantEvaluation selectedRestaurant={selectedRestaurant}></RestaurantEvaluation>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}

const mapStateToProps = (state) => {
    console.log(state);
    return { 
        restaurantRatings : state.restaurantRatings,
        selectedRestaurant : state.selectedRestaurant
    };
}
export default connect(mapStateToProps, {getRestaurantsRating})(App);