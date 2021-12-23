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

function CustomDrawer({
                          data,
                          currentDrawerType,
                          selectedNodeSummary,
                          isDrawerOpen,
                          setIsDrawerOpen,
                          loadNewNodeGraph,
                          nodeSummaries
                      }: any) {

    const [specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy] = useState<number>();

    function getDrawerHeader() {
        switch (currentDrawerType) {
            case DRAWER_TYPE.SPECIFIC_NODE:
                return "Specific Node Filter";
            default:
                return selectedNodeSummary?.name;
        }
    }

    function getDrawerBody() {
        switch (currentDrawerType) {
            case DRAWER_TYPE.SPECIFIC_NODE:
                return <span>
                    {generateRadioButtons()}
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
                               onClick={() => setSpecificNodeIdToFilterBy(node.id)}/>
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
