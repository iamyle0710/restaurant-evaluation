import React, {Component} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import './App.css';
import { getRestaurantsRating, getRestaurantWords, getSuggestions } from '../actions';
import HeaderRow from './Header/HeaderRow';
import RestuarantMap from './RestaurantMap/RestaurantMap';
import RestaurantEvaluation from './RestaurantEvaluation/RestaurantEvaluation';

class App extends Component {

    componentDidMount(){
        this.props.getRestaurantsRating();
        this.props.getRestaurantWords();
        this.props.getSuggestions();
    }

    render(){
        let restaurantRatings = this.props.restaurantRatings || [];
        let selectedRestaurant = this.props.selectedRestaurant || null;
        let restaurantWords = this.props.restaurantWords || [];
        let suggestions = (selectedRestaurant) ? this.props.suggestions.filter(restaurant => restaurant.performance !== selectedRestaurant.performance) : [];
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
                        <RestaurantEvaluation 
                            selectedRestaurant={selectedRestaurant} 
                            words={selectedRestaurant ? restaurantWords[selectedRestaurant.name] : []}
                            suggestions={suggestions}
                        ></RestaurantEvaluation>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}

const mapStateToProps = (state) => {
    // console.log(state);
    return { 
        restaurantRatings : state.restaurantRatings,
        restaurantWords : state.restaurantWords,
        selectedRestaurant : state.selectedRestaurant,
        suggestions : state.suggestions
    };
}
export default connect(mapStateToProps, {getRestaurantsRating, getRestaurantWords, getSuggestions})(App);