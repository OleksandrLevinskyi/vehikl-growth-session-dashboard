import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Flex,
    Heading,
    Spacer,
    useColorMode,
    IconButton,
    Link as StyledLink,
    Image, HStack, Divider, Center
} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {User} from "./types/Types";
import {Link as RouteLink} from "react-router-dom";
import DataContextProvider from "./DataContextProvider";
import RouterProvider from "./components/router_provider/RouterProvider";

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

                        {
                            !loggedInUser ?
                                <StyledLink color='light-blue' size='large' padding={3}
                                            href="http://localhost:8000/login/github">
                                    LOG IN
                                </StyledLink>
                                :
                                <Flex onClick={() => setLoggedInUser(null)}>
                                    <Center>
                                        <Image
                                            borderRadius='full'
                                            boxSize='40px'
                                            src={loggedInUser.avatar}
                                            alt='User Icon'
                                        />
                                    </Center>
                                    <StyledLink color='light-blue' size='large' padding={3} href="#">
                                        LOG OUT
                                    </StyledLink>
                                </Flex>
                        }
                        {
                            colorMode === 'light' ?
                                <IconButton
                                    aria-label={'Sun Icon'}
                                    size='lg'
                                    icon={<SunIcon/>}
                                    onClick={toggleColorMode}/> :
                                <IconButton
                                    aria-label={'Moon Icon'}
                                    size='lg'
                                    icon={<MoonIcon/>}
                                    onClick={toggleColorMode}/>
                        }
                    </HStack>
                </Flex>

                <Divider/>

            </RouterProvider>
        </DataContextProvider>
    );
};

export default App;