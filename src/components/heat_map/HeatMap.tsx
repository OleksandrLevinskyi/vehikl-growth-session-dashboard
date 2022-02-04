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
            width = 450 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

        let svg = d3.select("#heat-map")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        console.log(data)

            // var rows = d3.map(data, function (d) {
            //     return d.group;
            // }).keys()
            // var cols = d3.map(data, function (d) {
            //     return d.variable;
            // }).keys()
//
//             // Build X scales and axis:
//             var x = d3.scaleBand()
//                 .range([0, width])
//                 .domain(myGroups)
//                 .padding(0.05);
//             svg.append("g")
//                 .style("font-size", 15)
//                 .attr("transform", "translate(0," + height + ")")
//                 .call(d3.axisBottom(x).tickSize(0))
//                 .select(".domain").remove()
//
//             // Build Y scales and axis:
//             var y = d3.scaleBand()
//                 .range([height, 0])
//                 .domain(myVars)
//                 .padding(0.05);
//             svg.append("g")
//                 .style("font-size", 15)
//                 .call(d3.axisLeft(y).tickSize(0))
//                 .select(".domain").remove()
//
//             // Build color scale
//             var myColor = d3.scaleSequential()
//                 .interpolator(d3.interpolateInferno)
//                 .domain([1, 100])
//
//             // create a tooltip
//             var tooltip = d3.select("#my_dataviz")
//                 .append("div")
//                 .style("opacity", 0)
//                 .attr("class", "tooltip")
//                 .style("background-color", "white")
//                 .style("border", "solid")
//                 .style("border-width", "2px")
//                 .style("border-radius", "5px")
//                 .style("padding", "5px")
//
//             // Three function that change the tooltip when user hover / move / leave a cell
//             var mouseover = function (d) {
//                 tooltip
//                     .style("opacity", 1)
//                 d3.select(this)
//                     .style("stroke", "black")
//                     .style("opacity", 1)
//             }
//             var mousemove = function (d) {
//                 tooltip
//                     .html("The exact value of<br>this cell is: " + d.value)
//                     .style("left", (d3.mouse(this)[0] + 70) + "px")
//                     .style("top", (d3.mouse(this)[1]) + "px")
//             }
//             var mouseleave = function (d) {
//                 tooltip
//                     .style("opacity", 0)
//                 d3.select(this)
//                     .style("stroke", "none")
//                     .style("opacity", 0.8)
//             }
//
//             // add the squares
//             svg.selectAll()
//                 .data(data, function (d) {
//                     return d.group + ':' + d.variable;
//                 })
//                 .enter()
//                 .append("rect")
//                 .attr("x", function (d) {
//                     return x(d.group)
//                 })
//                 .attr("y", function (d) {
//                     return y(d.variable)
//                 })
//                 .attr("rx", 4)
//                 .attr("ry", 4)
//                 .attr("width", x.bandwidth())
//                 .attr("height", y.bandwidth())
//                 .style("fill", function (d) {
//                     return myColor(d.value)
//                 })
//                 .style("stroke-width", 4)
//                 .style("stroke", "none")
//                 .style("opacity", 0.8)
//                 .on("mouseover", mouseover)
//                 .on("mousemove", mousemove)
//                 .on("mouseleave", mouseleave)
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
