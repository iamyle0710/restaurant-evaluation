import React, { useRef } from 'react';

import "./BarChart.css";
import { useWindowResize, useHBarChartRender } from '../../../hooks';

function HBarChart({data, xLabel, yLabel, title, unit, color}){

    const svgRef = useRef();
    const svgDimension = useWindowResize(svgRef); 
    const margins = {top: 20, right : 20, bottom : 30, left: 100};

    useHBarChartRender(svgRef, svgDimension, margins, xLabel, yLabel, unit, color, data);

    if(!data || data.length === 0){
        return (
            <div className='d-flex flex-column nodata'>
                <i className="messageIcon fa fa-bar-chart" aria-hidden="true"></i>
                <span className="message">No available data</span>
            </div>
        )
    }
    return (
        <React.Fragment>
            <div className='d-flex flex-column'>
                <div className="chartTitle">{title}</div>
                <svg ref={svgRef}>
                    <g className="chart">
                        <g className="xChartAxis"></g>
                        <g className="yChartAxis"></g>
                        <text className="yLabel"></text>
                        <text className="xLabel"></text>
                    </g>
                </svg>
            </div>    
        </React.Fragment>      
    )
}


export default HBarChart;