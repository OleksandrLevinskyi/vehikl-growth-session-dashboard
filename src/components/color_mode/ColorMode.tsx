import {IconButton} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import React from "react";

interface IColorModeProps {
    colorMode: "light" | "dark",
    onClick: () => void
}

const ColorMode: React.FC<IColorModeProps> = ({colorMode, onClick}) => {
    return <>
        {
            colorMode === "light" ?
                <IconButton
                    aria-label={"Sun Icon"}
                    size="lg"
                    icon={<SunIcon/>}
                    onClick={onClick}/> :
                <IconButton
                    aria-label={"Moon Icon"}
                    size="lg"
                    icon={<MoonIcon/>}
                    onClick={onClick}/>
        }
    </>;
}

export default ColorMode;