import React from 'react';
import './RadioButtonList.css';
import {Box, VStack} from "@chakra-ui/react";

function RadioButtonList({nodes, specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy}: any) {

    function generateRadioButtons() {
        return nodes
            .map((node: any, key: number) =>
                <Box as='label' key={`box-${key}`}>
                    <input type="radio" id={node.id}
                           name="specific_node_filter"
                           key={`radio-${key}`}
                           onChange={() => setSpecificNodeIdToFilterBy(node.id)}
                           checked={isRadioChecked(node.id)} hidden/>
                    <Box
                        cursor='pointer'
                        borderWidth='1px'
                        borderRadius='md'
                        boxShadow='md'
                        bg={isRadioChecked(node.id) ? 'teal.600' : ''}
                        px={5}
                        py={3}
                    >
                        {node.name}
                    </Box>
                </Box>)
    }

    const isRadioChecked = (nodeId: number) => {
        if (nodeId === specificNodeIdToFilterBy) {
            return true;
        }
        return false;
    }

    return (
        <>
            <VStack>
                {generateRadioButtons()}
            </VStack>
        </>
    );
}

export default RadioButtonList;