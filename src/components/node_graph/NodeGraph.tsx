import './NodeGraph.css';
import * as d3 from 'd3';
import React, {useEffect, useState} from "react";
import {
    Button
} from "@chakra-ui/react";
import {Graph} from "./utils/Graph";
import {Connection, NodeSummary} from "./utils/NodeSummary";
import CustomDrawer from "../custom_drawer/CustomDrawer";
import {Node, NodeGraphType} from "../../types/Types";

export const DRAWER_TYPE = {
    DEFAULT: 'DEFAULT',
    SPECIFIC_NODE: 'SPECIFIC_NODE',
    MULTIPLE_NODES: 'MULTIPLE_NODES'
}

const NodeGraph: React.FC = () => {
    const [data, setData] = useState<NodeGraphType>();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [currentDrawerType, setCurrentDrawerType] = useState<string>(DRAWER_TYPE.DEFAULT);

    const [nodeSummaries, setNodeSummaries] = useState<Array<NodeSummary>>();
    const [selectedNodeSummary, setSelectedNodeSummary] = useState<NodeSummary>();

    useEffect(() => {
        fetch('http://localhost:8001/nodegraph')
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);

                    let graph = new Graph(result);
                    let nodeSummaries = [...result.nodes].map((node: Node) => graph.getNodeInfo(node));
                    setNodeSummaries(nodeSummaries);
                },
                (error) => {
                    console.error('error fetching data: ', error);
                }
            )
    }, []);

    useEffect(() => {
        if (data && nodeSummaries) {
            loadNewNodeGraph(data)
        }
    }, [nodeSummaries])

    const loadNewNodeGraph = (data: NodeGraphType) => {
        d3.select('#svg-container').selectChild().remove();
        d3.select('#svg-container').append('svg');

        let svg: any = d3.select("#svg-container").selectChild(),
            width = window.innerWidth * .95,
            height = window.innerHeight * .8;

        svg.attr('width', width)
            .attr('height', height);

        svg = svg.append('g')
            .attr("class", "node-graph");

        const edge = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.edges)
            .enter()
            .append("g");

        let link = edge.append("line");

        const nodeGroup = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")

        nodeGroup.append("circle")
            .attr("r", 25)
            .attr("fill", (node: Node) => {
                if (node.id == data.nodes[0].id && currentDrawerType == DRAWER_TYPE.SPECIFIC_NODE) return "orange";
                return "blue";
            });

        nodeGroup.append("text")
            .text((node: Node) => node.name)
            .attr('class', 'label')
            .attr('text-anchor', 'middle')

        const drag_handler = d3.drag()
            .on("start", (event: any, node: any) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                node.fx = node.x;
                node.fy = node.y;
            })
            .on("drag", (event: any, node: any) => {
                node.fx = event.x;
                node.fy = event.y;
            })
            .on("end", (event: any, node: any) => {
                if (!event.active) simulation.alphaTarget(0);
                node.fx = null;
                node.fy = null;
            });

        drag_handler(nodeGroup as any);

        nodeGroup.on('click', (event: any) => {
            let selectedNodeId = event.target.__data__.id;
            let selectedNodeSummary = nodeSummaries!.filter((node: NodeSummary) => node.id === selectedNodeId)[0];

            setSelectedNodeSummary(selectedNodeSummary);
            setIsDrawerOpen(true);
            setCurrentDrawerType(DRAWER_TYPE.DEFAULT);
        })

        const zoom = d3.zoom()
            .on('zoom', (event: any) => svg.attr("transform", event.transform));
        zoom(d3.select('#svg-container').selectChild());

        let edgeText = edge.append("text")
            .text((d: any) => d.weight);

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink(...data.edges as any).distance((d: any) => {
                return currentDrawerType == DRAWER_TYPE.DEFAULT ?
                    Math.sqrt(1 / d.weight) * 10000 :
                    Math.sqrt(1 / d.weight) * 1000;
            })
                .id((link: any) => link.id))
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

            nodeGroup.attr("transform", (d: any) => "translate(" + d.x + "," + d.y + ")")
            edgeText.attr("transform", (d: any) => "translate(" + (d.source.x + d.target.x) / 2 + "," + (d.source.y + d.target.y) / 2 + ")")
        }
    }

    return (
        <>
            <Button onClick={() => {
                setIsDrawerOpen(true)
                setCurrentDrawerType(DRAWER_TYPE.SPECIFIC_NODE)
            }} className="filter-button">Filter By Specific Node</Button>

            <Button onClick={() => {
                setIsDrawerOpen(true)
                setCurrentDrawerType(DRAWER_TYPE.MULTIPLE_NODES)
            }} className="filter-button">Filter By Multiple Nodes</Button>

            <span id="svg-container"/>

            <CustomDrawer data={data} currentDrawerType={currentDrawerType} selectedNodeSummary={selectedNodeSummary}
                          isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}
                          loadNewNodeGraph={loadNewNodeGraph} nodeSummaries={nodeSummaries}/>
        </>
    );
}

export default NodeGraph;
