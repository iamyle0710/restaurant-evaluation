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
        let suggestions = this.props.suggestions || [];
        if(!selectedRestaurant){
            return (
                <Container fluid className="d-flex h-100 flex-column mr-0 ml-0 pl-0 pr-0">
                    <Row style={{position: "relative", zIndex: 1}}>
                        <Col className="mr-0 ml-0 pl-2 pr-0">
                            <HeaderRow></HeaderRow>
                        </Col>  
                    </Row>
                    <Row className="flex-grow-1 mr-0 ml-0 pl-0 pr-0">
                        <Col sm={12} lg={12} className="mr-0 ml-0 pl-0 pr-0">
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
            <Container fluid className="d-flex flex-column mr-0 ml-0 pl-0 pr-0" style={{position: "relative", height: "100%"}}>
                <Row style={{position: "relative", zIndex: 1}}>
                    <Col className="mr-0 ml-0 pl-2 pr-0">
                        <HeaderRow></HeaderRow>
                    </Col>  
                </Row>
                <Row className="mr-0 ml-0 pl-0 pr-0" style={{position: "relative", height: "100%"}}>
                    <Col sm={12} lg={8} className="mr-0 ml-0 pl-0 pr-0" style={{position: "relative", height: "100%"}}>
                        <RestuarantMap 
                            restaurantRatings={restaurantRatings}
                            selectedRestaurant={selectedRestaurant}
                        ></RestuarantMap>
                    </Col>
                    <Col sm={12} lg={4} className="mr-0 ml-0 pl-0 pr-0" style={{position: "relative", height: "100%"}}>
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