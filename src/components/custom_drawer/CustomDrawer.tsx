import React, {useContext, useEffect, useState} from 'react';
import './CustomDrawer.css';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    Flex,
    DrawerOverlay, Input
} from "@chakra-ui/react";
import {DRAWER_TYPE} from "../node_graph/NodeGraph";
import {Connection, NodeSummary} from "../node_graph/utils/NodeSummary";
import CheckboxList from "../checkbox_list/CheckboxList";
import RadioButtonList from "../radio_button_list/RadioButtonList";
import {useNavigate} from "react-router-dom";
import {Node} from "../../types/Types";
import {DataContext} from "../../DataContextProvider";

function CustomDrawer({
                          currentDrawerType,
                          selectedNodeSummary,
                          isDrawerOpen,
                          setIsDrawerOpen,
                          loadNewNodeGraph,
                          nodeSummaries
                      }: any) {
    const [filteredNodes, setFilteredNodes] = useState<any>([]);
    const [multipleNodeIdsToFilterBy, setMultipleNodeIdsToFilterBy] = useState<Array<number>>([]);
    const [specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy] = useState<number | undefined>(undefined);

    const history = useNavigate();

    const {nodes} = useContext(DataContext);

    useEffect(() => {
        if (nodes) {
            setFilteredNodes([...nodes]);
        }
    }, [nodes])

    function getDrawerHeader() {
        switch (currentDrawerType) {
            case DRAWER_TYPE.MULTIPLE_NODES:
                return "Multiple Nodes Filter";
            case DRAWER_TYPE.SPECIFIC_NODE:
                return "Specific Node Filter";
            default:
                return selectedNodeSummary?.name;
        }
    }

    function getDrawerBody() {
        switch (currentDrawerType) {
            case DRAWER_TYPE.MULTIPLE_NODES:
                return <span>
                    <CheckboxList
                        nodes={filteredNodes}
                        multipleNodeIdsToFilterBy={multipleNodeIdsToFilterBy}
                        setMultipleNodeIdsToFilterBy={setMultipleNodeIdsToFilterBy}/>
                </span>
            case DRAWER_TYPE.SPECIFIC_NODE:
                return <span>
                    <RadioButtonList nodes={filteredNodes} specificNodeIdToFilterBy={specificNodeIdToFilterBy}
                                     setSpecificNodeIdToFilterBy={setSpecificNodeIdToFilterBy}/>
                </span>
            default:
                return selectedNodeSummary?.formatted_connections.length! > 0 ?
                    selectedNodeSummary?.formatted_connections.map((connection: string, key: number) => <p
                        key={key}>{connection}</p>) :
                    "no records";
        }
    }

    function getInputs() {
        if (currentDrawerType == DRAWER_TYPE.MULTIPLE_NODES || currentDrawerType == DRAWER_TYPE.SPECIFIC_NODE) {
            return <Flex p="2">
                <Input variant='flushed' placeholder='Enter node names to filter by ...'
                       onChange={(e: any) => {
                           const selectedNodes = nodes.filter((node: any) => node.name.toUpperCase().startsWith(e.target.value.toUpperCase()));
                           setFilteredNodes(selectedNodes);
                       }}/>

                <Button onClick={() => {
                    if (currentDrawerType == DRAWER_TYPE.MULTIPLE_NODES) {
                        history(`/node-graph?mn=${multipleNodeIdsToFilterBy.join('.')}`)

                        loadNewNodeGraph(filterDataByMultipleNodesFilterSelection(nodeSummaries, multipleNodeIdsToFilterBy))
                    }
                    if (currentDrawerType == DRAWER_TYPE.SPECIFIC_NODE) {
                        history(`/node-graph?sn=${specificNodeIdToFilterBy}`)

                        loadNewNodeGraph(filterDataBySpecificNodeFilterSelection(nodeSummaries, specificNodeIdToFilterBy!))
                    }
                }}>Apply</Button>
            </Flex>
        }
    }

    return (
        <>
            <Drawer
                isOpen={isDrawerOpen}
                placement='right'
                size='sm'
                onClose={() => {
                    setIsDrawerOpen(false);
                    setFilteredNodes([...nodes]);
                }}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>{getDrawerHeader()}</DrawerHeader>

                    {getInputs()}

                    <DrawerBody>
                        {getDrawerBody()}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default CustomDrawer;


export const filterDataByMultipleNodesFilterSelection = (nodeSummaries: Array<NodeSummary>, multipleNodeIdsToFilterBy: Array<number>) => {
    let filteredNodeSummaries: Array<NodeSummary> = nodeSummaries
        .filter((nodeSummary: NodeSummary) => multipleNodeIdsToFilterBy.includes(nodeSummary.id));

    let edges: any = [],
        nodes: any = [];

    filteredNodeSummaries.forEach((nodeSummary: NodeSummary) => nodes.push({
        id: nodeSummary.id,
        name: nodeSummary.name
    }))

    filteredNodeSummaries.forEach((nodeSummary: NodeSummary) => {
        if (multipleNodeIdsToFilterBy.includes(nodeSummary.id)) {
            nodeSummary.connections.forEach(({id, name, weight}: Connection) => {
                if (
                    multipleNodeIdsToFilterBy.includes(id) &&
                    !edges.filter((edge: any) => (edge.source === nodeSummary.id && edge.target === id) || (edge.source === id && edge.target === nodeSummary.id))[0]
                ) {
                    edges.push({source: nodeSummary.id, target: id, weight});
                }
            })
        }
    });

    return {nodes, edges};
}

export const filterDataBySpecificNodeFilterSelection = (nodeSummaries: Array<NodeSummary>, specificNodeIdToFilterBy: number) => {
    let filteredNodeSummary = nodeSummaries
        .filter((nodeSummary: NodeSummary) => nodeSummary.id === specificNodeIdToFilterBy)[0];

    let edges: any = [],
        nodes: Array<Node> = [{id: filteredNodeSummary.id, name: filteredNodeSummary.name} as Node];

    filteredNodeSummary.connections.forEach(({id, name, weight}: Connection) => {
        nodes.push({id, name} as Node);
        edges.push({source: specificNodeIdToFilterBy, target: id, weight});
    });

    return {nodes, edges};
}
