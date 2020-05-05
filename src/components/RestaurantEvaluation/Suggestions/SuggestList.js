import React from 'react';
import {Dropdown, DropdownButton, Badge} from 'react-bootstrap';

import './SuggestList.css';
import Item from './SuggestItem';

class SuggestList extends React.Component{

    constructor(props){
        super(props);

        let cuisineTypes = {};
        let total = 0;
        let performanceLevels = ["All", "Bad", "Median", "Good"];
        let performanceIndex = performanceLevels.indexOf(props.performance);
        let filterPerformance = "All";
        cuisineTypes["All"] = 0;

        props.suggestions.forEach(item => {
            if(!cuisineTypes.hasOwnProperty(item.cuisine)){
                cuisineTypes[item.cuisine] = 0;
            }

            cuisineTypes[item.cuisine] += 1
            total += 1;
        });

        cuisineTypes["All"] = total;

        this.state = {
            cuisineTypes : cuisineTypes,
            performanceLevels : performanceLevels,
            filterCuisine : "All",
            filterPerformance : filterPerformance,
            matchItems : this.props.suggestions
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.performance !== prevProps.performance){
            this.getFilterPerformance();
        }  
    }

    getFilterPerformance(){
        let performanceIndex = this.state.performanceLevels.indexOf(this.props.performance);
        let filterPerformance = performanceIndex === (this.state.performanceLevels.length - 1) ? "All" : this.state.performanceLevels[performanceIndex + 1];
        this.setState({
            filterPerformance : filterPerformance
        });
    }

    filterItems(){
        const cuisine = this.state.filterCuisine;
        const performance = this.state.filterPerformance;

        if(cuisine === "All" && performance === "All"){
            return this.props.suggestions;
        };

        let rst = this.props.suggestions.filter(item => {
            if(cuisine === "All"){
                return true;
            }
            return item.cuisine === cuisine;
        });

        rst = rst.filter(item => {
            if(performance === "All"){
                return true;
            }
            return item.performance === performance;
        });

        return rst;
    }

    changeFilters(type, value){
        // console.log("fitler:", value)
        switch(type){
            case "cuisine":
                this.setState({
                    filterCuisine : value
                });
                break;
            case "performance":
                this.setState({
                    filterPerformance : value
                });
                break;
            default:
                break;
        }
        
    }

    renderCuisineTypes(){
        let rst = [];
        const types = this.state.cuisineTypes;

        for(var type in types){
            ((type) => {
                rst.push(
                    <Dropdown.Item 
                        className="filterType" 
                        key={type}
                        onClick={() => this.changeFilters("cuisine", type)}
                    >
                        {type}  
                        <Badge>{types[type]}</Badge>
                    </Dropdown.Item>
                )
            })(type)
        }
        return rst;
    }

    renderPerformances(){
        let rst = [];
        const types = this.state.performanceLevels;

        for(var i = 0; i < types.length ; i++){
            var type = types[i];
            ((type) => {
                rst.push(
                    <Dropdown.Item 
                        className="filterType" 
                        key={type}
                        onClick={() => this.changeFilters("performance", type)}
                    >
                        {type}  
                    </Dropdown.Item>
                )
            })(type)
        }
        return rst;
    }

    renderList (items){
        let rst = [];
    
        for(var i = 0; i < items.length; i++){
            rst.push(<Item key={items[i].name} restaurant={items[i]}></Item>)
        };
        return rst;
    }
    
    render (){
        const items = this.filterItems();
        // console.log(items, this.props.suggestions);

        return (
            <div id="SuggestList" className="d-flex flex-column">
                <div className="d-flex flex-row" style={{marginBottom: "10px"}}>
                    <DropdownButton className="suggest_filter_btn" title={"Cusine : " + this.state.filterCuisine }>
                        {this.renderCuisineTypes()}
                    </DropdownButton>
                    <DropdownButton className="suggest_filter_btn" title={"Performance : " + this.state.filterPerformance }>
                        {this.renderPerformances()}
                    </DropdownButton>
                </div>
                <div className="d-flex flex-row" style={{flexWrap: "wrap"}}>
                    {this.renderList(items)}
                </div>   
            </div>   
        )
    }
}

export default SuggestList;