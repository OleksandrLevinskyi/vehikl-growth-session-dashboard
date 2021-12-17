import React, {useState} from 'react';
import './App.css';
import {Button, Flex, Heading, Spacer} from "@chakra-ui/react";
import Panel from "./components/panel/Panel";
import NodeGraph from "./components/node_graph/NodeGraph";

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
            <Flex>
                <Heading>GS Analytics Board</Heading>
                <Spacer/>
                <Button onClick={selectAllTime}>All Time</Button>
                <Button onClick={selectMonthly}>Monthly</Button>
            </Flex>
            <NodeGraph/>
            <iframe src="http://localhost:3005/d/IvJGVgTnk/new-dashboard?orgId=1&kiosk&theme=light" frameBorder="0"/>
            {text}
        </>
    );
}

export default App;
