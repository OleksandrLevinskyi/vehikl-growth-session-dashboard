import {IconButton, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import React from "react";
import * as d3 from "d3";
import {COLOR_MODE} from "../../types/Types";

const ColorMode: React.FC = () => {

    const {colorMode, toggleColorMode} = useColorMode();

    const onClickHandler = () => {
        toggleColorMode();

        // node graph styling changes
        d3.selectAll("line").attr("stroke", colorMode === COLOR_MODE.DARK ? "#808080" : "#fff");
        d3.selectAll(".edge_text").attr("fill", colorMode === COLOR_MODE.DARK ? "#000" : "#fff");
        d3.select("#node-graph").selectChild().attr('class', colorMode === COLOR_MODE.LIGHT ? COLOR_MODE.DARK : COLOR_MODE.LIGHT);
    }

    return <>
        {
            colorMode === "light" ?
                <IconButton
                    aria-label={"Sun Icon"}
                    size="lg"
                    icon={<SunIcon/>}
                    onClick={onClickHandler}/> :
                <IconButton
                    aria-label={"Moon Icon"}
                    size="lg"
                    icon={<MoonIcon/>}
                    onClick={onClickHandler}/>
        }
    </>;
}

export default ColorMode;