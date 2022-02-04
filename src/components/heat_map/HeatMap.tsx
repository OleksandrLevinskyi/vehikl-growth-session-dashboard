import './HeatMap.css';
import * as d3 from 'd3';
import React, {useEffect, useState} from "react";

export const DRAWER_TYPE = {
    DEFAULT: 'DEFAULT',
    SPECIFIC_NODE: 'SPECIFIC_NODE',
    MULTIPLE_NODES: 'MULTIPLE_NODES'
}

const HeatMap: React.FC = () => {
    const [data, setData] = useState<any>();

    useEffect(() => {
        fetch('http://localhost:8000/heatmap')
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                },
                (error) => {
                    console.error('error fetching data: ', error);
                }
            )
    }, []);

    useEffect(() => {
        if (data) {
            loadNewHeatMap(data)
        }
    }, [data])

    const loadNewHeatMap = (data: any) => {
        d3.select('#heat-map').selectChildren().remove();

        let margin = {top: 80, right: 25, bottom: 30, left: 120, tooltipTop: 140, tooltipLeft: 130},
            width = window.innerWidth * .95 - margin.left - margin.right,
            height = window.innerWidth * .95 - margin.top - margin.bottom;

        let svg = d3.select("#heat-map")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        let rows = d3.map(data, (dataPoint: any) => dataPoint.source);
        let cols = d3.map(data, (dataPoint: any) => dataPoint.target);


        let xScale = d3.scaleBand()
            .range([0, width])
            .domain(rows)
            .padding(0.05);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale).tickSize(0))
            .select(".domain").remove();

        let yScale = d3.scaleBand()
            .range([height, 0])
            .domain(cols)
            .padding(0.05);

        svg.append("g")
            .call(d3.axisLeft(yScale).tickSize(0))
            .select(".domain").remove();

        const maxWeight = data.reduce((prev: any, current:any) =>{
            return (prev.weight > current.weight) ? prev : current
        }).weight?? 0;


        let colorRange = d3.scaleSequential()
            .interpolator(d3.interpolateGreens)
            // .interpolator(["rgb(49,255,0)", "rgb(0,90,13)"])
            .domain([1, maxWeight]);

        let tooltip = d3.select("#heat-map")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip");

        const mouseover = (event: any) => {
            tooltip
                .style("opacity", 1)

            d3.select(event.target)
                .style("stroke", "red")
                .style("opacity", 1)
        }
        const mousemove = (event: any) => {
            const cellData = event.target.__data__;
            console.log(d3.pointer(event))

            tooltip
                .html(`${cellData.source} + ${cellData.target}: ${cellData.weight}`)
                .style("left", (d3.pointer(event)[0] + margin.tooltipLeft) + "px")
                .style("top", (d3.pointer(event)[1] + margin.tooltipTop) + "px")
        }
        const mouseleave = (event: any) => {
            tooltip
                .style("opacity", 0)

            d3.select(event.target)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        svg.selectAll()
            .data(data, (dataPoint: any) => dataPoint.source + ':' + dataPoint.target)
            .enter()
            .append("rect")
            .attr("x", (dataPoint: any) => xScale(dataPoint.source) as any)
            .attr("y", (dataPoint: any) => yScale(dataPoint.target) as any)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("fill", (dataPoint: any) => dataPoint.weight === 0 ? 'red' : colorRange(dataPoint.weight))
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
//
// // Add title to graph
//         svg.append("text")
//             .attr("x", 0)
//             .attr("y", -50)
//             .attr("text-anchor", "left")
//             .style("font-size", "22px")
//             .text("A d3.js heatmap");
//
// // Add subtitle to graph
//         svg.append("text")
//             .attr("x", 0)
//             .attr("y", -20)
//             .attr("text-anchor", "left")
//             .style("font-size", "14px")
//             .style("fill", "grey")
//             .style("max-width", 400)
//             .text("A short description of the take-away message of this chart.");
    }


    return (
        <>
            <span id="heat-map"/>
        </>
    );
}

export default HeatMap;
