import React from 'react';
import {
    Flex,
    Heading,
    Text
} from "@chakra-ui/react";
import Login from "../login/Login";

const LoggedOutUI: React.FC = () => {

    return (
        <>
            <Flex p={2} fontSize='xl' alignItems='center' justifyContent='center' direction='column' height={'100vh'}>
                <Heading>GS Analytics Board</Heading>

                <Text color='gray.400'>Please log in to view the dashboard.</Text>

                <Login/>
            </Flex>
        </>
    );
};

export default LoggedOutUI;