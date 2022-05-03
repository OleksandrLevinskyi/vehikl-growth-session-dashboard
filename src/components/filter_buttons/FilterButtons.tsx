import React, {useContext} from "react";
import {Button, Flex} from "@chakra-ui/react";
import {DRAWER_TYPE} from "../node_graph/NodeGraph";
import {DrawerContext} from "../../providers/DrawerContextProvider";

const FilterButtons: React.FC = () => {

    const {setCurrentDrawerType, setIsDrawerOpen} = useContext(DrawerContext);

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