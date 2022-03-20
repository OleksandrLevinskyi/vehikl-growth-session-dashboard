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
    const [multipleNodeIdsToFilterBy, setMultipleNodeIdsToFilterBy] = useState<Array<number>>([]);
    const [specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy] = useState<number | undefined>(undefined);

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
                    <CheckboxList nodes={data.nodes} multipleNodeIdsToFilterBy={multipleNodeIdsToFilterBy}
                                  setMultipleNodeIdsToFilterBy={setMultipleNodeIdsToFilterBy}/>
                    <Button onClick={() => loadNewNodeGraph(filterDataByMultipleNodesFilterSelection())}>Apply</Button>
                </span>
            case DRAWER_TYPE.SPECIFIC_NODE:
                return <span>
                    <RadioButtonList nodes={data.nodes} specificNodeIdToFilterBy={specificNodeIdToFilterBy}
                                     setSpecificNodeIdToFilterBy={setSpecificNodeIdToFilterBy}/>
                    <Button onClick={() => loadNewNodeGraph(filterDataBySpecificNodeFilterSelection())}>Apply</Button>
                </span>
            default:
                return selectedNodeSummary?.formatted_connections.length! > 0 ?
                    selectedNodeSummary?.formatted_connections.map((connection: string, key: number) => <p
                        key={key}>{connection}</p>) :
                    "no records";
        }
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
