import React, { useRef, useEffect, useState } from 'react';
import { select, axisLeft, axisBottom, scaleBand, scaleLinear, interpolateLab } from "d3";

import "./BarChart.css";

function BarChart({data, xLabel, yLabel}){

    const svgRef = useRef();
    const svgDimension = useWindowResize(svgRef); 
    const margins = {top: 20, right : 20, bottom : 50, left: 45};

    useChartRender(svgRef, svgDimension, margins, xLabel, yLabel, data);

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

/**
 * Custom Window Resize Hook
 * update element width and height when window resize 
 * @param {useRef} ref - element reference that you want to track
 * @return { 
 *      width : element current width,
 *      height : element current height,
 *      setDimension : setDimension callback
 * }
 */
function useWindowResize(ref){

    const [dimension, setDimension] = useState({width : 300, height : 200});

    useEffect(()=>{
        function handleResize(e){
            setDimension({
                width : ref.current.width.baseVal.value,
                height : ref.current.height.baseVal.value,
            });
        }

        window.addEventListener("resize", handleResize); 
        
        return () => {
            window.removeEventListener("resize", handleResize)
        };
    });

    return { width : dimension.width, height : dimension.height, setDimension};
}

/**
 * Custom Bar Chart Render Hook
 * triggers when data or element dimension changes
 * @param {useRef} svgRef - element reference
 * @param {*} svgDimension  - { width : element width , height : element height, setDimension : set dimension function } 
 * @param {{top, right, bottom, left}} margins - margins of the svg container
 * @param {string} xLabel - label under the x axis
 * @param {string} yLabel - label under the y axis
 * @param {[{day, value}]} data
 */
function useChartRender(svgRef, svgDimension, margins, xLabel, yLabel, data){

    useEffect(()=>{

        if (!data || !svgRef | !svgRef.current){
            return 
        }

        if(svgDimension.width !== svgRef.current.width.baseVal.value || svgDimension.height !== svgRef.current.height.baseVal.value){
            svgDimension.setDimension({
                width : svgRef.current.width.baseVal.value,
                height : svgRef.current.height.baseVal.value,
            });
        }
        const chartDimension = {
            width : svgDimension.width - margins.left - margins.right,
            height : svgDimension.height - margins.top - margins.bottom
        };

        const xScale = scaleBand()
            .domain(data.map(d => d.day))
            .range([0, chartDimension.width])
            .padding(0.2);

        const yScale = scaleLinear()
            .domain([0, Math.max(...data.map(d => d.value))])
            .range([chartDimension.height, 0]);

        const colorScale = scaleLinear()
            .domain([0, Math.max(...data.map(d => d.value))])
            .range(['#a7a7f4', '#6161f4']);

        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);
        const svg = select(svgRef.current);
        
        svg.select(".chart")
            .attr("transform", "translate("+margins.left + "," + margins.top + ")");
        
        svg.select(".chart")
            .selectAll("rect")
            .data(data)
            .join(
                enter => enter.append("rect")
                    .attr("x", d => xScale(d.day))
                    .attr("y", d => yScale(d.value))
                    .attr("width", xScale.bandwidth)
                    .attr("height", d => chartDimension.height - yScale(d.value))
                    .attr("fill", d => colorScale(d.value)),
                update => update
                    .transition()
                    .attr("x", d => xScale(d.day))
                    .attr("y", d => yScale(d.value))
                    .attr("width", xScale.bandwidth)
                    .attr("height", d => chartDimension.height - yScale(d.value)),
                exit => exit.remove()
            );
        
        svg.select(".chart .xChartAxis")
            .transition()
            .attr("transform", "translate(0," + chartDimension.height+")")
            .call(xAxis);

        svg.select(".chart .yChartAxis")
            .transition()
            .call(yAxis);

        // Add Y Title
        svg.select(".chart .yLabel")
            .attr("transform", "rotate(-90)")
            .attr("text-anchor", "middle")
            .attr("x", -chartDimension.height / 2)
            .attr("y", -margins.left * 0.7 - 5)
            .text(yLabel);

        // Add Y Title
        svg.select(".chart .xLabel")
            .attr("x", chartDimension.width / 2)
            .attr("y", chartDimension.height + 40)
            .text(xLabel);

    },[data, svgDimension]);
}

export default BarChart;