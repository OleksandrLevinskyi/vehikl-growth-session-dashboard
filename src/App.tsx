import React, {useState} from 'react';
import './App.css';
import {Button, Flex, Heading, Spacer} from "@chakra-ui/react";

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
            {text}
        </>
  );
}

export default App;
