import React from 'react';
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

function CustomDrawer({
                          data,
                          currentDrawerType,
                          selectedNodeSummary,
                          isDrawerOpen,
                          setIsDrawerOpen,
                          specificNodeToFilter,
                          setSpecificNodeToFilter
                      }: any) {
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
                    <Button onClick={() => console.log(specificNodeToFilter)}>Apply</Button>
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
                        <input type="radio" id={node.name}
                               name="specific_node_filter"
                               key={`radio-${key}`}
                               onClick={()=>setSpecificNodeToFilter(node.id)}/>
                        <label htmlFor={node.name}
                               key={`label-${key}`}>{node.name}</label>
                        <br/>
                    </span>)
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
