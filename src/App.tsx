import React from 'react';
import './App.css';
import {Button, Flex, Heading, Spacer} from "@chakra-ui/react";

function App() {
  return (
      <>
          <Flex>
              <Heading>GS Analytics Board</Heading>
              <Spacer/>
              <Button>All Time</Button>
              <Button>Monthly</Button>
          </Flex>

      </>
  );
}

export default App;
