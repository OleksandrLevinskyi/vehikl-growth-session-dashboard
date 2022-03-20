import React, {useState} from 'react';
import './CheckboxList.css';
import {Connection, NodeSummary} from "../node_graph/utils/NodeSummary";
import {Button} from "@chakra-ui/react";


function CheckboxList({nodes, multipleNodeIdsToFilterBy, setMultipleNodeIdsToFilterBy}:any) {

    function generateCheckBoxes() {
        return nodes
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

    const isCheckboxChecked = (nodeId: number) => {
        if (multipleNodeIdsToFilterBy.includes(nodeId)) {
            return true;
        }
        return false;
    }

    return (
        <>
            {generateCheckBoxes()}
        </>
    );
}

export default CheckboxList;
