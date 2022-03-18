import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Flex,
    Heading,
    Spacer,
    useColorMode,
    IconButton,
    Link as StyledLink,
    Image, HStack, StackDivider
} from "@chakra-ui/react";
import NodeGraph from "./components/node_graph/NodeGraph";
import GrafanaDashboard from "./components/grafana_dashboard/GrafanaDashboard";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {User} from "./types/Types";
import HeatMap from "./components/heat_map/HeatMap";
import {BrowserRouter as Router, Link as RouteLink, Route, Routes} from "react-router-dom";

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
        <>
            <Flex>
                <Heading>GS Analytics Board</Heading>
                <Spacer/>

                {
                    !loggedInUser ?
                        <StyledLink color='light-blue' size='large' padding={3}
                                    href="http://localhost:8000/login/github">Log
                            In</StyledLink>
                        :
                        <Flex onClick={() => setLoggedInUser(null)}>
                            <Image
                                borderRadius='full'
                                boxSize='50px'
                                src={loggedInUser.avatar}
                                alt='User Icon'
                            />
                            <StyledLink color='light-blue' size='large' padding={3} href="#">Log Out</StyledLink>
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
            </Flex>
            <Spacer/>
                <Router>
                        {/*<NavLink to="/dashboard"><Tab>Dashboard</Tab></NavLink>*/}
                        {/*<NavLink to="/node-graph"><Tab>Node Graph</Tab></NavLink>*/}
                        {/*<NavLink to="/heat-map"><Tab>Heat Map</Tab></NavLink>*/}
                        <HStack spacing={3} divider={<StackDivider/>} as="nav">
                            <RouteLink to="/dashboard">
                                Dashboard
                            </RouteLink>
                            <RouteLink to="/node-graph">
                                Node Graph
                            </RouteLink>
                            <RouteLink to="/heat-map">
                                Heat Map
                            </RouteLink>

                        </HStack>

                    <Routes>
                        <Route path="/dashboard/:date" element={<GrafanaDashboard colorMode={colorMode}/>}/>
                        <Route path="/node-graph" element={<NodeGraph/>}/>
                        <Route path="/heat-map" element={<HeatMap/>}/>

                        <Route path="/*" element={<GrafanaDashboard colorMode={colorMode}/>}/>
                    </Routes>
                </Router>
        </>
    );
};

export default App;