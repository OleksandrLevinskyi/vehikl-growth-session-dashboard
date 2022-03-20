import React from 'react';
import './RadioButtonList.css';
import {Box, HStack, useRadio, useRadioGroup} from "@chakra-ui/react";

function RadioButtonList({nodes, specificNodeIdToFilterBy, setSpecificNodeIdToFilterBy}: any) {

    const options = ['react', 'vue', 'svelte']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    })

    const group = getRootProps()

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
            <HStack {...group}>
                {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                    )
                })}
            </HStack>
            {/*{generateRadioButtons()}*/}
        </>
    );
}

export default RadioButtonList;

function RadioCard(props:any) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: 'teal.600',
                    color: 'white',
                    borderColor: 'teal.600',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
        </Box>
    )
}