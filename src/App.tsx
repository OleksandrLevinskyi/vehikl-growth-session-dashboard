import React, {useState} from 'react';
import './App.css';
import {Button, Flex, Heading, Spacer, TabList, Tab, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import Panel from "./components/panel/Panel";
import NodeGraph from "./components/node_graph/NodeGraph";
import GrafanaDashboard from "./components/grafana_dashboard/GrafanaDashboard";

function App() {
    const [text, setText] = useState(() => "");

    function selectAllTime() {
        console.log('')
        setText("all time option is selected")
    }

    function selectMonthly() {
        setText("monthly option is selected")
    }

    return (
        <>
            <Heading>GS Analytics Board</Heading>
            <Spacer/>
            <Tabs>
                <TabList>
                    <Tab>All Time</Tab>
                    <Tab>Node Graph</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <GrafanaDashboard/>
                    </TabPanel>
                    <TabPanel>
                        <NodeGraph/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
}

export default App;
