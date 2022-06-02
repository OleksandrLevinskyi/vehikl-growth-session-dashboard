import "./NodeGraph.css";
import * as d3 from "d3";
import React, {useContext, useEffect, useState} from "react";
import {Center, useColorMode} from "@chakra-ui/react";
import CustomDrawer, {
    filterDataByMultipleNodesFilterSelection,
    filterDataBySpecificNodeFilterSelection
} from "../custom_drawer/CustomDrawer";
import {COLOR_MODE, Node} from "../../types/Types";
import {useSearchParams} from "react-router-dom";
import {DataContext} from "../../providers/DataContextProvider";
import FilterButtons from "../filter_buttons/FilterButtons";
import {DrawerContext} from "../../providers/DrawerContextProvider";

export const DRAWER_TYPE = {
    DEFAULT: "DEFAULT",
    SPECIFIC_NODE: "SPECIFIC_NODE",
    MULTIPLE_NODES: "MULTIPLE_NODES"
}

const NodeGraph: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    const {nodes, edgeDictionary, nodeDictionary, connections} = useContext(DataContext);

    const {currentDrawerType, setCurrentDrawerType, setIsDrawerOpen} = useContext(DrawerContext);

    const [selectedNodeIdForDescription, setSelectedNodeIdForDescription] = useState<number>();

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const specificNodeFilter = searchParams.get("sn");
        const multipleNodeFilter = searchParams.get("mn");

        if (nodes) {
            if (specificNodeFilter) {
                const querySpecificNodeId = specificNodeFilter;
                const filteredData = filterDataBySpecificNodeFilterSelection(Number(querySpecificNodeId), nodeDictionary, connections, edgeDictionary);

                setCurrentDrawerType(DRAWER_TYPE.SPECIFIC_NODE);
                loadNewNodeGraph(filteredData, DRAWER_TYPE.SPECIFIC_NODE)
            } else if (multipleNodeFilter) {
                const queryMultipleNodeIds = multipleNodeFilter.split(".");
                const filteredData = filterDataByMultipleNodesFilterSelection(queryMultipleNodeIds.map((id: string) => Number(id)), nodeDictionary, connections, edgeDictionary);

                setCurrentDrawerType(DRAWER_TYPE.MULTIPLE_NODES);
                loadNewNodeGraph(filteredData, DRAWER_TYPE.MULTIPLE_NODES)
            }
        }
    }, [nodes])

    const loadNewNodeGraph = (data: any, displayMode = currentDrawerType) => {
        d3.select("#node-graph").selectChild().remove();
        d3.select("#node-graph").append("svg").classed(colorMode, true);

        const width = window.innerWidth;
        const height = window.innerHeight * .9;

        let svg: any = d3.select("#node-graph").selectChild();

        svg.attr("width", width)
            .attr("height", height);

        svg = svg.append("g")
            .attr("class", "node-graph");

        const edge = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(data.edges)
            .enter()
            .append("g");

        const link = edge.append("line")
            .attr("stroke", colorMode === COLOR_MODE.DARK ? "#fff" : "#808080");

        const nodeGroup = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")

        nodeGroup.append("circle")
            .attr("r", 25)
            .attr("fill", (node: Node) => {
                if (node.id == data.nodes[0].id && displayMode == DRAWER_TYPE.SPECIFIC_NODE) return "#dd5f12";
                return "#5593f0";
            });

        nodeGroup.append("text")
            .text((node: Node) => node.name)
            .attr("class", "label")
            .attr("text-anchor", "middle")

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

        nodeGroup.on("click", (event: any) => {
            const selectedNodeId = event.target.__data__.id;

            setSelectedNodeIdForDescription(selectedNodeId);
            setIsDrawerOpen(true);
            setCurrentDrawerType(DRAWER_TYPE.DEFAULT);
        })

        const zoom = d3.zoom()
            .on("zoom", (event: any) => svg.attr("transform", event.transform));
        zoom(d3.select("#node-graph").selectChild());

        const edgeText = edge.append("text")
            .attr("class", "edge_text")
            .attr("fill", colorMode === COLOR_MODE.DARK ? "#fff" : "#000")
            .text((d: any) => d.weight);

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink(...data.edges as any).distance((d: any) => {
                return displayMode == DRAWER_TYPE.DEFAULT ?
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
            <FilterButtons/>

            <span id="node-graph" data-testid="node-graph">
                <Center fontSize="xl" p="5">Use options above to generate a node graph.</Center>
            </span>

            <CustomDrawer
                selectedNodeIdForDescription={selectedNodeIdForDescription}
                loadNewNodeGraph={loadNewNodeGraph}/>
        </>
    );
}

export default NodeGraph;