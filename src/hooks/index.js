import { useEffect, useState } from "react";
import {
  select,
  axisLeft,
  axisBottom,
  format,
  scaleBand,
  scaleLinear,
  schemeCategory10,
  pie,
  arc,
  scaleOrdinal
} from "d3";

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
export const useWindowResize = ref => {
  const [dimension, setDimension] = useState({ width: 300, height: 200 });

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }

    function handleResize(e) {
      console.log(ref, ref.current);
      setDimension({
        width: ref.current.width.baseVal.value,
        height: ref.current.height.baseVal.value
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return { width: dimension.width, height: dimension.height, setDimension };
};

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
export const useBarChartRender = (
  svgRef,
  svgDimension,
  margins,
  xLabel,
  yLabel,
  data
) => {
  useEffect(() => {
    if (!data || !svgRef | !svgRef.current) {
      return;
    }

    if (
      svgDimension.width !== svgRef.current.width.baseVal.value ||
      svgDimension.height !== svgRef.current.height.baseVal.value
    ) {
      svgDimension.setDimension({
        width: svgRef.current.width.baseVal.value,
        height: svgRef.current.height.baseVal.value
      });
    }
    const chartDimension = {
      width: svgDimension.width - margins.left - margins.right,
      height: svgDimension.height - margins.top - margins.bottom
    };
    const maxValue = Math.max(...data.map(d => d.value));
    const xScale = scaleBand()
      .domain(data.map(d => d.day))
      .range([0, chartDimension.width])
      .padding(0.2);

    const yScale = scaleLinear()
      .domain([0, maxValue <= 10 ? 10 : maxValue])
      .range([chartDimension.height, 0]);

    const colorScale = scaleLinear()
      .domain([0, Math.max(...data.map(d => d.value))])
      .range(["#a7a7f4", "#6161f4"]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale).ticks(5).tickFormat(format("d"));
    const svg = select(svgRef.current);

    svg
      .select(".chart")
      .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

    svg
      .select(".chart")
      .selectAll("rect")
      .data(data)
      .join(
        enter =>
          enter
            .append("rect")
            .attr("x", d => xScale(d.day))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth)
            .attr("height", d => chartDimension.height - yScale(d.value))
            .attr("fill", d => colorScale(d.value)),
        update =>
          update
            .transition()
            .attr("x", d => xScale(d.day))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth)
            .attr("height", d => chartDimension.height - yScale(d.value)),
        exit => exit.remove()
      );

    svg
      .select(".chart .xChartAxis")
      .transition()
      .attr("transform", "translate(0," + chartDimension.height + ")")
      .call(xAxis);

    svg
      .select(".chart .yChartAxis")
      .transition()
      .call(yAxis);

    // Add Y Title
    svg
      .select(".chart .yLabel")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("x", -chartDimension.height / 2)
      .attr("y", -margins.left * 0.7 - 5)
      .text(yLabel);

    // Add Y Title
    svg
      .select(".chart .xLabel")
      .attr("x", chartDimension.width / 2)
      .attr("y", chartDimension.height + 40)
      .text(xLabel);
  }, [data, svgDimension]);
};

/**
 *
 */
export const usePieChartRender = (svgRef, svgDimension, data) => {
  useEffect(() => {
    if (
      svgDimension.width !== svgRef.current.width.baseVal.value ||
      svgDimension.height !== svgRef.current.height.baseVal.value
    ) {
      svgDimension.setDimension({
        width: svgRef.current.width.baseVal.value,
        height: svgRef.current.height.baseVal.value
      });
    }
    const { width, height } = svgDimension;
    const createPie = pie()
      .value(d => d.value)
      .sort(null);
    const createArc = arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    const colors = scaleOrdinal(schemeCategory10);
    const chartData = createPie(data);
    console.log(chartData);
    const svg = select(svgRef.current);

    svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

    svg
      .select("g.chart")
      .attr("stroke", "white")
      .selectAll("path")
      .data(chartData)
      .join(
        enter =>
          enter
            .append("g")
            .attr("class", "arc")
            .append("path")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(i)),
        update => update.attr("d", createArc),
        exit => exit.remove()
      );
  }, [data, svgDimension]);
};
