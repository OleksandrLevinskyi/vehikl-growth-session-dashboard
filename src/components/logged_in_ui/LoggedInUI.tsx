import React from 'react';
import {
    Flex,
    Heading,
    Spacer,
    HStack, Divider, IconButton, Link
} from "@chakra-ui/react";
import {Link as RouteLink} from "react-router-dom";
import DataContextProvider from "../../providers/DataContextProvider";
import DrawerContextProvider from "../../providers/DrawerContextProvider";
import RouterProvider from "../router_provider/RouterProvider";
import Login from "../login/Login";
import ColorMode from "../color_mode/ColorMode";
import {EmailIcon} from "@chakra-ui/icons";

const LoggedInUI: React.FC = () => {
    return (
        <DataContextProvider>
            <DrawerContextProvider>
                <RouterProvider>
                    <Flex p={2} fontSize='xl' alignItems='center'>
                        <Heading>GS Analytics Dashboard</Heading>

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
                            <ColorMode/>
                        </HStack>

                        <Link href={"https://forms.gle/bZP3qBYN9GsdK9hs7"} isExternal>
                            <IconButton
                                ms={5}
                                aria-label={"Info Icon"}
                                size="lg"
                                icon={<EmailIcon/>}/>
                        </Link>
                    </Flex>

                    <Divider/>

                </RouterProvider>
            </DrawerContextProvider>
        </DataContextProvider>
    );
};

export default LoggedInUI;