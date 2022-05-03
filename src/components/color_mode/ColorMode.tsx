import {IconButton} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import React from "react";

export const ColorMode = (props: { colorMode: "light" | "dark", onClick: () => void }) => {
    return <>
        {
            props.colorMode === "light" ?
                <IconButton
                    aria-label={"Sun Icon"}
                    size="lg"
                    icon={<SunIcon/>}
                    onClick={props.onClick}/> :
                <IconButton
                    aria-label={"Moon Icon"}
                    size="lg"
                    icon={<MoonIcon/>}
                    onClick={props.onClick}/>
        }
    </>;
}