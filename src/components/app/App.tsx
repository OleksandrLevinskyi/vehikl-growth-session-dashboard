import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Flex,
    Heading,
    Spacer,
    useColorMode,
    HStack, Divider
} from "@chakra-ui/react";
import {User} from "../../types/Types";
import {Link as RouteLink} from "react-router-dom";
import DataContextProvider from "../../providers/DataContextProvider";
import RouterProvider from "../router_provider/RouterProvider";
import {DrawerContextProvider} from "../../providers/DrawerContextProvider";
import Login from "../login/Login";
import ColorMode from "../color_mode/ColorMode";

const App: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const [loggedInUser, setLoggedInUser] = useState<User | null>();

    useEffect(() => {
        let hashToken = window.location.hash.slice(1);
        if (hashToken) {
            fetch(`http://localhost:8000/social_user/${hashToken}`)
                .then((res) => res.json())
                .then(
                    (result) => {
                        setLoggedInUser(result);
                    },
                    (error) => {
                        console.error('error fetching data: ', error);
                    }
                )
        }
    }, []);

    return (
        <DataContextProvider>
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

                            <Login loggedInUser={loggedInUser} onClick={() => setLoggedInUser(null)}/>
                            <ColorMode colorMode={colorMode} onClick={toggleColorMode}/>
                        </HStack>
                    </Flex>

                    <Divider/>

                </RouterProvider>
            </DrawerContextProvider>
        </DataContextProvider>
    );
};

export default App;