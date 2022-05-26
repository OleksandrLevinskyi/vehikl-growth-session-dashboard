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
import Login from "../login/Login";
import ColorMode from "../color_mode/ColorMode";
import axios from "axios";
import Cookies from 'js-cookie';
import DrawerContextProvider from "../../providers/DrawerContextProvider";

const App: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const [loggedInUser, setLoggedInUser] = useState<User | null>();

    useEffect(() => {
        // const hashToken = Cookies.get('token');
        let unmounted = false;

        // if (!hashToken) return;

        const getUserFromApi = async () => {
            // const user = await axios.get(`http://localhost:8001/api/social_user`);
            //
            // if (!unmounted && user) setLoggedInUser(user.data);
        }

        getUserFromApi();

        return () => {
            unmounted = true;
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