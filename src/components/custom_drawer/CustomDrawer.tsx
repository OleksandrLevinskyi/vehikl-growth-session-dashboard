import React, {useState} from 'react';
import './CustomDrawer.css';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay
} from "@chakra-ui/react";
import {DRAWER_TYPE} from "../node_graph/NodeGraph";
import {Connection, NodeSummary} from "../node_graph/utils/NodeSummary";
import CheckboxList from "../checkbox_list/CheckboxList";
import RadioButtonList from "../radio_button_list/RadioButtonList";

function CustomDrawer({
                          data,
                          currentDrawerType,
                          selectedNodeSummary,
                          isDrawerOpen,
                          setIsDrawerOpen,
                          loadNewNodeGraph,
                          nodeSummaries
                      }: any) {
    const [specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy] = useState<number | undefined>(undefined);
    const [multipleNodeIdsToFilterBy, setMultipleNodeIdsToFilterBy] = useState<Array<number>>([]);

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
                    {/*{generateCheckBoxes()}*/}
                    <CheckboxList/>
                    <Button onClick={() => loadNewNodeGraph(filterDataByMultipleNodesFilterSelection())}>Apply</Button>
                </span>
            case DRAWER_TYPE.SPECIFIC_NODE:
                return <span>
                    {/*{generateRadioButtons()}*/}
                    <RadioButtonList/>
                    <Button onClick={() => loadNewNodeGraph(filterDataBySpecificNodeFilterSelection())}>Apply</Button>
                </span>
            default:
                return selectedNodeSummary?.formatted_connections.length! > 0 ?
                    selectedNodeSummary?.formatted_connections.map((connection: string, key: number) => <p
                        key={key}>{connection}</p>) :
                    "no records";
        }
    }

    function generateRadioButtons() {
        return data.nodes
            .map((node: any, key: number) => <span key={`span-${key}`}>
                        <input type="radio" id={node.id}
                               name="specific_node_filter"
                               key={`radio-${key}`}
                               onChange={() => setSpecificNodeIdToFilterBy(node.id)}
                               checked={isRadioChecked(node.id)}/>
                        <label htmlFor={node.id}
                               key={`label-${key}`}>{node.name}</label>
                        <br/>
                    </span>)
    }

    function generateCheckBoxes() {
        return data.nodes
            .map((node: any, key: number) => <span key={`span-${key}`}>
                        <input type="checkbox" id={node.id}
                               name="multipe_node_filter"
                               key={`checkobx-${key}`}
                               onChange={() => {
                                   if (multipleNodeIdsToFilterBy.includes(node.id)) {
                                       setMultipleNodeIdsToFilterBy([...multipleNodeIdsToFilterBy].filter((nodeId) => nodeId !== node.id));
                                   } else {
                                       setMultipleNodeIdsToFilterBy([...multipleNodeIdsToFilterBy, node.id])
                                   }
                               }}
                               checked={isCheckboxChecked(node.id)}/>
                        <label htmlFor={node.id}
                               key={`label-${key}`}>{node.name}</label>
                        <br/>
                    </span>)
    }

    function filterDataBySpecificNodeFilterSelection() {
        let filteredNodeSummary = nodeSummaries
            .filter((nodeSummary: NodeSummary) => nodeSummary.id === specificNodeIdToFilterBy)[0];

        let edges: any = [],
            nodes = [{id: filteredNodeSummary.id, name: filteredNodeSummary.name}];

        filteredNodeSummary.connections.forEach(({id, name, weight}: Connection) => {
            nodes.push({id, name});
            edges.push({source: specificNodeIdToFilterBy, target: id, weight});
        });

        return {nodes, edges};
    }

    function filterDataByMultipleNodesFilterSelection() {
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

    const isRadioChecked = (nodeId: number) => {
        if (nodeId === specificNodeIdToFilterBy) {
            return true;
        }
        return false;
    }

    const isCheckboxChecked = (nodeId: number) => {
        if (multipleNodeIdsToFilterBy.includes(nodeId)) {
            return true;
        }
        return false;
    }

    return (
        <>
            <Drawer
                isOpen={isDrawerOpen}
                placement='right'
                onClose={() => setIsDrawerOpen(false)}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>{getDrawerHeader()}</DrawerHeader>

                    <DrawerBody>
                        {getDrawerBody()}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default CustomDrawer;
