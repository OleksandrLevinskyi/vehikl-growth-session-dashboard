import React from 'react';
import './RadioButtonList.css';


function RadioButtonList({nodes, specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy}: any) {

    function generateRadioButtons() {
        return nodes
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

    const isRadioChecked = (nodeId: number) => {
        if (nodeId === specificNodeIdToFilterBy) {
            return true;
        }
        return false;
    }

    return (
        <>
            {generateRadioButtons()}
        </>
    );
}

export default RadioButtonList;
