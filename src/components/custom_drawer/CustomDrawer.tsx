import React, {useContext, useEffect, useState} from "react";
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
import CheckboxList from "../checkbox_list/CheckboxList";
import RadioButtonList from "../radio_button_list/RadioButtonList";
import {useNavigate} from "react-router-dom";
import {Node} from "../../types/Types";
import {DataContext} from "../../providers/DataContextProvider";
import {DrawerContext} from "../../providers/DrawerContextProvider";

interface ICustomDrawerProps {
    selectedNodeIdForDescription: number | undefined,
    loadNewNodeGraph: any,
}

const CustomDrawer: React.FC<ICustomDrawerProps> = ({
                                                        selectedNodeIdForDescription,
                                                        loadNewNodeGraph,
                                                    }) => {
    const [filteredNodes, setFilteredNodes] = useState<any>([]);
    const [multipleNodeIdsToFilterBy, setMultipleNodeIdsToFilterBy] = useState<Array<number>>([]);
    const [specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy] = useState<number | undefined>(undefined);

    const {currentDrawerType, isDrawerOpen, setIsDrawerOpen} = useContext(DrawerContext);

    const history = useNavigate();

    const {nodes, nodeDictionary, connections, edgeDictionary} = useContext(DataContext);

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
                return nodeDictionary && selectedNodeIdForDescription ? nodeDictionary[selectedNodeIdForDescription] : "";
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
                return getNodeDescription(selectedNodeIdForDescription!, connections, nodeDictionary, edgeDictionary);
        }
    }

    function getInputs() {
        if (currentDrawerType == DRAWER_TYPE.MULTIPLE_NODES || currentDrawerType == DRAWER_TYPE.SPECIFIC_NODE) {
            return <Flex p="2">
                <Input variant="flushed" placeholder="Enter node names to filter by ..."
                       onChange={(e: any) => {
                           const selectedNodes = nodes.filter((node: any) => node.name.toUpperCase().startsWith(e.target.value.toUpperCase()));
                           setFilteredNodes(selectedNodes);
                       }}/>

                <Button ml="5" onClick={() => {
                    if (currentDrawerType == DRAWER_TYPE.MULTIPLE_NODES) {
                        history(`/node-graph?mn=${multipleNodeIdsToFilterBy.join(".")}`)

                        loadNewNodeGraph(filterDataByMultipleNodesFilterSelection(multipleNodeIdsToFilterBy, nodeDictionary, connections, edgeDictionary))
                    }
                    if (currentDrawerType == DRAWER_TYPE.SPECIFIC_NODE) {
                        history(`/node-graph?sn=${specificNodeIdToFilterBy}`)

                        loadNewNodeGraph(filterDataBySpecificNodeFilterSelection(specificNodeIdToFilterBy!, nodeDictionary, connections, edgeDictionary))
                    }
                }}>Apply</Button>
            </Flex>
        }
    }

    return (
        <>
            <Drawer
                isOpen={isDrawerOpen}
                placement="right"
                size="sm"
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

export const filterDataByMultipleNodesFilterSelection = (multipleNodeIdsToFilterBy: Array<number>, nodeDictionary: any, connections: any, edgeDictionary: any) => {
    let edges: any = [],
        nodes: any = [];

    multipleNodeIdsToFilterBy.forEach((nodeId: number) => nodes.push({
        id: nodeId,
        name: nodeDictionary[nodeId],
    }));

    multipleNodeIdsToFilterBy.forEach((nodeId: number) => {
        connections[nodeId].forEach((connectionId: number) => {
            if (
                multipleNodeIdsToFilterBy.includes(connectionId) &&
                !edges.filter((edge: any) => (edge.source === nodeId && edge.target === connectionId) || (edge.source === connectionId && edge.target === nodeId))[0]
            ) {
                edges.push({
                    source: nodeId,
                    target: connectionId,
                    weight: getWeight(nodeId, connectionId, edgeDictionary)
                });
            }
        })
    });

    return {nodes, edges: edges.filter((e: any) => e.weight > 0)};
}

export const filterDataBySpecificNodeFilterSelection = (specificNodeIdToFilterBy: number, nodeDictionary: any, connections: any, edgeDictionary: any) => {
    let edges: any = [],
        nodes: Array<Node> = [{id: specificNodeIdToFilterBy, name: nodeDictionary[specificNodeIdToFilterBy]} as Node];

    connections[specificNodeIdToFilterBy].forEach((connectionId: number) => {
        nodes.push({id: connectionId, name: nodeDictionary[connectionId]} as Node);
        edges.push({
            source: specificNodeIdToFilterBy,
            target: connectionId,
            weight: getWeight(specificNodeIdToFilterBy, connectionId, edgeDictionary)
        });
    });

    return {nodes, edges: edges.filter((e: any) => e.weight > 0)};
}

export const getWeight = (nodeId: number, connectionId: number, edgeDictionary: any) => {
    return (connectionId > nodeId ?
        edgeDictionary[`${connectionId}_${nodeId}`] :
        edgeDictionary[`${nodeId}_${connectionId}`]) ?? 0;
}

export const getNodeDescription = (nodeId: number, connections: any, nodeDictionary: any, edgeDictionary: any) => {
    return connections && nodeId && connections[nodeId].length > 0 ?
        connections[nodeId].sort((a: number, b: number) => getWeight(nodeId, b, edgeDictionary) - getWeight(nodeId, a, edgeDictionary))
            .map(
                (connectionId: number) =>
                    <p key={`desc_${nodeId}_${connectionId}`}>{nodeDictionary[connectionId]}: {getWeight(nodeId, connectionId, edgeDictionary)}</p>
            ) :
        "no records";
}