import './NodeGraph.css';
import * as d3 from 'd3';
import {useEffect, useState} from "react";
import {
    Button, Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import {Graph} from "./utils/Graph";
import {Connection, NodeSummary} from "./utils/NodeSummary";

const DRAWER_TYPE = {
    DEFAULT: 'DEFAULT',
    SPECIFIC_NODE: 'SPECIFIC_NODE',
    MULTIPLE_NODES: 'MULTIPLE_NODES'
}

function NodeGraph() {
    const [data, setData] = useState<any>();
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [currentDrawerType, setCurrentDrawerType] = useState<string>(DRAWER_TYPE.DEFAULT);

    const [nodeSummaries, setSelectedNodeSummaries] = useState<Array<NodeSummary>>();
    const [selectedNodeSummary, setSelectedNodeSummary] = useState<NodeSummary>();

    useEffect(() => {
        fetch('http://localhost:8000/nodegraph')
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);

                    let nodeSummaries = [...result.nodes].map((node: any) => (new Graph(result)).getNodeInfo(node));
                    setSelectedNodeSummaries(nodeSummaries);
                },
                (error) => {
                    console.error('error fetching data: ', error);
                }
            )
    }, []);


    const CustomDrawer: React.FC = ({children}) => {
        return (
            <div>
                <Drawer
                    isOpen={isDrawerOpen}
                    placement='right'
                    onClose={() => setIsDrawerOpen(false)}
                >
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton/>
                        {children}
                    </DrawerContent>
                </Drawer>
            </div>
        )
    }

    function loadNodeGraph() {
        let svg: any = d3.select("svg"),
            width = window.innerWidth * .9,
            height = window.innerHeight * .9;


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

        const node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("g")
            .data(data.nodes)
            .enter()
            .append("g")

        const circles = node.append("circle")
            .attr("r", 80)
            .attr("fill", "blue");

        node.append("text")
            .text((d: any) => d.name)
            .attr('class', 'label')
            .attr('text-anchor', 'middle')

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

        node.on('click', (event: any) => {
            let selectedNodeId = event.target.__data__.id;
            let a = nodeSummaries!.filter((node: any) => node.id === selectedNodeId)[0]

            setSelectedNodeSummary(a);
            setIsDrawerOpen(true)
            setCurrentDrawerType(DRAWER_TYPE.DEFAULT)
        })

        const zoom = d3.zoom()
            .on('zoom', (event: any) => svg.attr("transform", event.transform));
        zoom(d3.select('svg'));

        let edgeText = edge.append("text")
            .text((d: any) => d.weight);

        const simulation = d3.forceSimulation()
            .force("link", d3.forceLink(...data.edges).distance((d: any) => {
                return Math.sqrt(1 / d.weight) * 20000;
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

    function generateRadioButtons() {
        return data.nodes
            .map((node: any, key: number) => <span key={`span-${key}`}>
                        <input type="radio" id={node.name}
                               name="specific_node_filter"
                               key={`radio-${key}`}/>
                        <label htmlFor={node.name}
                               key={`label-${key}`}>{node.name}</label>
                        <br/>
                    </span>)
    }

    function getDrawerBody() {
        switch (currentDrawerType) {
            case DRAWER_TYPE.SPECIFIC_NODE:
                return <span>
                    {generateRadioButtons()}
                    <Button onClick={()=>console.log('abc')}>Apply</Button>
                </span>
            default:
                return selectedNodeSummary?.formatted_connections.length! > 0 ?
                    selectedNodeSummary?.formatted_connections.map((connection: string, key: number) => <p
                        key={key}>{connection}</p>) :
                    "no records";
        }
    }

    function getDrawerHeader() {
        switch (currentDrawerType) {
            case DRAWER_TYPE.SPECIFIC_NODE:
                return "Specific Node Filter";
            default:
                return selectedNodeSummary?.name;
        }
    }

    return (
        <>
            <Button onClick={() => {
                loadNodeGraph()
            }}>Get Data + Create SVG</Button>
            <Button onClick={() => {
                setIsDrawerOpen(true)
                setCurrentDrawerType(DRAWER_TYPE.SPECIFIC_NODE)
            }}>Filter By Specific Node</Button>

            <svg/>

            <CustomDrawer>
                <DrawerHeader>{getDrawerHeader()}</DrawerHeader>

                <DrawerBody>
                    {getDrawerBody()}
                </DrawerBody>
            </CustomDrawer>
        </>
    );
}

export default NodeGraph;
