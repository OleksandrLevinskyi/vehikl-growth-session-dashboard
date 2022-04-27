import React from "react";
import {Button, Flex} from "@chakra-ui/react";
import {DRAWER_TYPE} from "../node_graph/NodeGraph";

function FilterButtons({setIsDrawerOpen, setCurrentDrawerType}: any) {

    return (
        <Flex justify='center' fontSize='xl'>
            <Button onClick={() => {
                setIsDrawerOpen(true)
                setCurrentDrawerType(DRAWER_TYPE.SPECIFIC_NODE)
            }} className="filter-button">FILTER BY SPECIFIC NODE</Button>

            <Button onClick={() => {
                setIsDrawerOpen(true)
                setCurrentDrawerType(DRAWER_TYPE.MULTIPLE_NODES)
            }} className="filter-button">FILTER BY MULTIPLE NODES</Button>
        </Flex>
    );
}

export default FilterButtons;
