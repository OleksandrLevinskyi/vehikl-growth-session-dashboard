import './NodeGraph.css';
import * as d3 from 'd3';
import {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";

function NodeGraph() {
    const transformMatrix = [1, 0, 0, 1, 0, 0];
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
                    console.log('error fetching data: ', error);
                }
            )
    }, []);

    function inlineMatrix() {
        return `matrix(${transformMatrix.join(' ')})`;
    }

    function loadNodeGraph() {
        let svg: any = d3.select("svg"),
            width = window.innerWidth * .9,
            height = window.innerHeight * .9;

        svg.attr('width', width)
            .attr('height', height);

        svg = svg.append('g')
            .attr('transform', inlineMatrix())
            .attr("class", "node-graph");

        const edge = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.edges)
            .enter()
            .append("g");

        let link = edge.append("line");

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")

        const circles = node.append("circle")
            .attr("r", 5)
            .attr("fill", "red");

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

        const zoom = d3.zoom()
            .on('zoom', (event: any) => svg.attr("transform", event.transform));
        zoom(d3.select('svg'));

        let edgeText = edge.append("text")
            .text((d: any) => d.weight)
            .attr('x', 6)
            .attr('y', 3);

        node.append("text")
            .text((d: any) => d.name)
            .attr('x', 6)
            .attr('y', 3);

        node.append("title")
            .text((d: any) => d.id);

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink(...data.edges).distance((d: any) => {
                return Math.sqrt(1 / d.weight) * 1000;
            })
                .id((link: any) => {
                    return link.id
                }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        simulation
            .nodes(data.nodes)
            .on("tick", ticked);

        simulation
            .force<any>("link")
            .links(data.edges);

        function ticked() {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node.attr("transform", (d: any) => "translate(" + d.x + "," + d.y + ")")
            edgeText.attr("transform", (d: any) => "translate(" + (d.source.x + d.target.x) / 2 + "," + (d.source.y + d.target.y) / 2 + ")")
        }
    }

    return (
        <>
            <Button onClick={() => {
                loadNodeGraph()
            }}>Get Data + Create SVG</Button>
            <svg/>
        </>
    );
}

export default NodeGraph;
