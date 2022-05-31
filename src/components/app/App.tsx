import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Flex,
    Heading,
    Spacer,
    useColorMode,
    HStack, Divider
} from "@chakra-ui/react";
import {Link as RouteLink} from "react-router-dom";
import DataContextProvider from "../../providers/DataContextProvider";
import RouterProvider from "../router_provider/RouterProvider";
import Login from "../login/Login";
import ColorMode from "../color_mode/ColorMode";
import DrawerContextProvider from "../../providers/DrawerContextProvider";
import LoginContextProvider from "../../providers/LoginContextProvider";

const App: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <DataContextProvider>
            <LoginContextProvider>
                <DrawerContextProvider>
                    <RouterProvider>
                        <Flex p={2} fontSize='xl' alignItems='center'>
                            <Heading>GS Analytics Board</Heading>

                            <Spacer/>

                            <HStack spacing="10" as="nav">
                                <RouteLink to="/dashboard">
                                    DASHBOARD
                                </RouteLink>
                                <RouteLink to="/node-graph">
                                    NODE GRAPH
                                </RouteLink>
                                <RouteLink to="/heat-map">
                                    HEAT MAP
                                </RouteLink>
                                <Divider orientation="vertical"/>

                                <Login/>
                                <ColorMode colorMode={colorMode} onClick={toggleColorMode}/>
                            </HStack>
                        </Flex>

                        <Divider/>

                    </RouterProvider>
                </DrawerContextProvider>
            </LoginContextProvider>
        </DataContextProvider>
    );
};

export default App;