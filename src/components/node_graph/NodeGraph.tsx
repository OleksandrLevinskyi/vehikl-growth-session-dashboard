import './NodeGraph.css';
import * as d3 from 'd3';
import {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";

function NodeGraph() {
    const [data, setData] = useState<any>();

    useEffect(() => {
        fetch('http://localhost:8000/nodegraph')
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(data);
                },
                (error) => {
                    console.log('error fetching data');
                }
            )
    }, []);

    function loadNodeGraph() {
        const svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");


        console.log(data)
        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.edges)
            .enter().append("line")
            .attr("stroke-width", function (d: any) {
                return Math.sqrt(d.value);
            });

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")

        const circles = node.append("circle")
            .attr("r", 5)
            .attr("fill", "red");

        // Create a drag handler and append it to the node object instead
        const drag_handler = d3.drag()
            .on("start", (event: any, d: any) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event: any, d: any) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event: any, d: any) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        drag_handler(node as any);

        const lables = node.append("text")
            .text(function (d: any) {
                return d.name;
            })
            .attr('x', 6)
            .attr('y', 3);

        node.append("title")
            .text(function (d: any) {
                return d.id;
            });

        const links = [...data.edges];
        // links.map((e: any) => {
        //     delete e.weight
        // })
        console.log(links)

        //@ts-ignore
        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id((link: any) => link.id))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation
            .nodes(data.nodes)
            .on("tick", ticked);

        simulation.force<any>("link")
            .links(data.edges);

        function ticked() {
            link
                .attr("x1", function (d: any) {
                    return d.source.x;
                })
                .attr("y1", function (d: any) {
                    return d.source.y;
                })
                .attr("x2", function (d: any) {
                    return d.target.x;
                })
                .attr("y2", function (d: any) {
                    return d.target.y;
                });

            node
                .attr("transform", function (d: any) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
        }
    }


    return (
        <>
            <Button onClick={() => {
                loadNodeGraph()
            }}>Get Data + Create SVG</Button>
            <svg width="900" height="600"/>
        </>
    );
}


export default NodeGraph;
