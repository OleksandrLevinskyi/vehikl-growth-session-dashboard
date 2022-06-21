import './HeatMap.css';
import * as d3 from 'd3';
import React, {useContext, useEffect} from "react";
import {DataContext} from "../../providers/DataContextProvider";

let colorOffset = 0;

function getCellColor(dataPoint: any, colorRange: any) {
    if (dataPoint.source === dataPoint.target) {
        return '#808080';
    }

    return dataPoint.weight === 0 ? '#ff3333' : colorRange(dataPoint.weight + colorOffset);
}

const HeatMap: React.FC = () => {
    const {nodes, edges, nodeDictionary, edgeDictionary} = useContext(DataContext);

    useEffect(() => {
        if (nodes && edges) loadNewHeatMap(nodes, edges);
    }, [nodes, edges]);

    const loadNewHeatMap = (nodes: any, edges: any) => {
        d3.select('#heat-map').selectChildren().remove();

        const margin = {top: 10, right: 10, bottom: 120, left: 120, tooltipTop: 140, tooltipLeft: 130},
            width = window.innerWidth * .95 - margin.left - margin.right,
            height = window.innerWidth * .95 - margin.top - margin.bottom;

        let svg = d3.select("#heat-map")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const rows = d3.map(edges, (dataPoint: any) => nodeDictionary[dataPoint.source]);
        const cols = d3.map(edges, (dataPoint: any) => nodeDictionary[dataPoint.target]);

        const xScale = d3.scaleBand()
            .range([0, width])
            .domain(rows)
            .padding(0.05);

        svg.append("g")
            .attr("transform", `translate(-${xScale.bandwidth() / 2},${height})`)
            .attr("id", "x-axis")
            .call(d3.axisBottom(xScale).tickSize(0))
            .select(".domain").remove();

        svg.select("#x-axis")
            .selectAll("text")
            .attr('text-anchor', 'end')
            .attr("dominant-baseline", "central")
            .attr("transform", "translate(0,5)rotate(-90)")

        const yScale = d3.scaleBand()
            .range([height, 0])
            .domain(cols)
            .padding(0.05);

        svg.append("g")
            .attr("id", "y-axis")
            .call(d3.axisLeft(yScale).tickSize(0))
            .select(".domain").remove();

        const maxWeight = d3.max(Object.keys(edgeDictionary).map((key: string) => edgeDictionary[key])) ?? 0;

        colorOffset = maxWeight / 2;

        const colorRange = d3.scaleSequential()
            .interpolator(d3.interpolateGreens)
            .domain([1, maxWeight + colorOffset]);

        const tooltip = d3.select("#heat-map")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip");

        const mouseover = (event: any) => {
            const cellData = event.target.__data__;

            if (cellData.source === cellData.target) return;

            tooltip
                .style("opacity", 1)

            d3.select(event.target)
                .style("stroke", "red")
                .style("opacity", 1)
        }

        const mousemove = (event: any) => {
            const cellData = event.target.__data__;

            if (cellData.source === cellData.target) return;

            tooltip
                .html(`${nodeDictionary[cellData.source]} + ${nodeDictionary[cellData.target]}: ${cellData.weight}`)
                .style("left", (d3.pointer(event)[0] + margin.tooltipLeft) + "px")
                .style("top", (d3.pointer(event)[1] + margin.tooltipTop) + "px")
        }

        const mouseleave = (event: any) => {
            const cellData = event.target.__data__;

            if (cellData.source === cellData.target) return;

            tooltip
                .style("opacity", 0)

            d3.select(event.target)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        svg.selectAll()
            .data(edges, (dataPoint: any) => nodeDictionary[dataPoint.source] + ':' + nodeDictionary[dataPoint.target])
            .enter()
            .append("rect")
            .attr("x", (dataPoint: any) => xScale(nodeDictionary[dataPoint.source]) as any)
            .attr("y", (dataPoint: any) => yScale(nodeDictionary[dataPoint.target]) as any)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("fill", (dataPoint: any) => getCellColor(dataPoint, colorRange))
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
    }

    return (
        <>
            <span id="heat-map" data-testid="heat-map"/>
        </>
    );
}

export default HeatMap;