import React, {useEffect, useState} from 'react';
import './App.css';
import {
    Flex,
    Heading,
    Spacer,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Tabs,
    useColorMode,
    IconButton,
    Link,
    Image
} from "@chakra-ui/react";
import NodeGraph from "./components/node_graph/NodeGraph";
import GrafanaDashboard from "./components/grafana_dashboard/GrafanaDashboard";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import {User} from "./types/Types";
import HeatMap from "./components/heat_map/HeatMap";

const App: React.FC = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const [loggedInUser, setLoggedInUser] = useState<User| null>();

    useEffect(() => {
        let hashToken = window.location.hash.slice(1);
        if (hashToken) {
            fetch(`http://localhost:8001/social_user/${hashToken}`)
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
                        <Link color='light-blue' size='large' padding={3} href="http://localhost:8001/login/github">Log
                            In</Link>
                        :
                        <Flex onClick={() => setLoggedInUser(null)}>
                            <Image
                                borderRadius='full'
                                boxSize='50px'
                                src={loggedInUser.avatar}
                                alt='User Icon'
                            />
                            <Link color='light-blue' size='large' padding={3} href="#">Log Out</Link>
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
            <Tabs>
                <TabList>
                    <Tab>Dashboard</Tab>
                    <Tab>Node Graph</Tab>
                    <Tab>Heat Map</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <GrafanaDashboard colorMode={colorMode}/>
                    </TabPanel>
                    <TabPanel>
                        <NodeGraph/>
                    </TabPanel>
                    <TabPanel>
                        <HeatMap/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};

export default App;
