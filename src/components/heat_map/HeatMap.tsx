import './HeatMap.css';
import * as d3 from 'd3';
import React, {useEffect, useState} from "react";
import {
    Button
} from "@chakra-ui/react";

export const DRAWER_TYPE = {
    DEFAULT: 'DEFAULT',
    SPECIFIC_NODE: 'SPECIFIC_NODE',
    MULTIPLE_NODES: 'MULTIPLE_NODES'
}

const HeatMap: React.FC = () => {
    const [data, setData] = useState<any>();
    // const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    // const [currentDrawerType, setCurrentDrawerType] = useState<string>(DRAWER_TYPE.DEFAULT);
    //
    // const [nodeSummaries, setNodeSummaries] = useState<Array<NodeSummary>>();
    // const [selectedNodeSummary, setSelectedNodeSummary] = useState<NodeSummary>();

    useEffect(() => {
        fetch('http://localhost:8001/heatmap')
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);

                    // let graph = new Graph(result);
                    // let nodeSummaries = [...result.nodes].map((node: Node) => graph.getNodeInfo(node));
                    // setNodeSummaries(nodeSummaries);
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
        let margin = {top: 80, right: 25, bottom: 30, left: 40},
            width = 1200 - margin.left - margin.right,
            height = 1200 - margin.top - margin.bottom;

        let svg = d3.select("#heat-map")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        console.log(data)

        let rows = d3.map(data, (dataPoint: any) => dataPoint.source);
        let cols = d3.map(data, (dataPoint: any) => dataPoint.target);


        let xScale = d3.scaleBand()
            .range([0, width])
            .domain(rows)
            .padding(0.05);

        // svg.append("g")
        //     .style("font-size", 15)
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(xScale).tickSize(0))
        // .select(".domain").remove();

        let yScale = d3.scaleBand()
            .range([height, 0])
            .domain(cols)
            .padding(0.05);

        // svg.append("g")
        //     .style("font-size", 15)
        //     .call(d3.axisLeft(yScale).tickSize(0))
//                 .select(".domain").remove()

        let colorRange = d3.scaleSequential()
            .interpolator(d3.interpolateInferno)
            .domain([1, 100])

        let tooltip = d3.select("#heat-map")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip");

        const mouseover = (event:any) =>{
            tooltip
                .style("opacity", 1)

            d3.select(event.target)
                .style("stroke", "red")
                .style("opacity", 1)
        }
        const mousemove = (event:any) =>{
            const cellData = event.target.__data__;
            console.log(d3.pointer(event))

            tooltip
                .html(`${cellData.source} + ${cellData.target}: ${cellData.weight}`)
                .style("left", (d3.pointer(event)[0] + 70) + "px")
                .style("top", (d3.pointer(event)[1]) + "px")
        }
        const mouseleave = (event:any) =>{
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
            .style("fill", (dataPoint: any) => colorRange(dataPoint.weight))
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
