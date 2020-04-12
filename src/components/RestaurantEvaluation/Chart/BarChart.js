import React, { useRef } from 'react';

import "./BarChart.css";
import { useWindowResize, useBarChartRender } from '../../../hooks';

function BarChart({data, xLabel, yLabel}){

    const svgRef = useRef();
    const svgDimension = useWindowResize(svgRef); 
    const margins = {top: 20, right : 20, bottom : 50, left: 45};

    useBarChartRender(svgRef, svgDimension, margins, xLabel, yLabel, data);

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
            <svg ref={svgRef}>
                <g className="chart">
                    <g className="xChartAxis"></g>
                    <g className="yChartAxis"></g>
                    <text className="yLabel"></text>
                    <text className="xLabel"></text>
                </g>
            </svg>
        </React.Fragment>      
    )
}


export default BarChart;