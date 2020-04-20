import React from 'react';
import { ascending } from 'd3';
import Barchart from '../Chart/BarChart';
import './WeekdayTraffic.css';

class WeekdayTraffic extends React.Component{

    sortOptions = {
        BY_DAY : 'Sort by Day',
        BY_VALUE : 'Sort by Value'
    }

    state = {
        data : this.props.data ? this.props.data.slice() : [],
        sortBy : 'BY_DAY',
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.data !== this.props.data){
            this.changeSortMethod();
        }
    }
    changeSortMethod(){
        let sortBy = this.state.sortBy === "BY_DAY" ? "BY_VALUE" : "BY_DAY";        
        this.sortData(sortBy);
    }

    sortData(method){
        let data = this.props.data.slice();

        switch(method){
            case "BY_VALUE":
                data.sort((a, b) => {
                    return ascending(a.value, b.value);
                });
                break;
            default:
                break;
        }
        
        this.setState({
            sortBy : method,
            data : data
        })
    }

    render(){
        // console.log(this.props);

        return (
            <div>
                <div className="d-flex flex-row titleRow">
                    <span className="cellName">Weekday Traffic</span>
                    <span className="sortBtn" onClick={() => this.changeSortMethod()}>
                        {this.sortOptions[this.state.sortBy]}
                        <i className="fa fa-sort" aria-hidden="true" style={{margin: "5px"}}></i>
                    </span>
                </div>
                <div style={{height: "200px"}}>
                    <Barchart data={this.state.data} xLabel="Day" yLabel="Customers"></Barchart>
                </div>
            </div>
        )
    }
}

export default WeekdayTraffic;