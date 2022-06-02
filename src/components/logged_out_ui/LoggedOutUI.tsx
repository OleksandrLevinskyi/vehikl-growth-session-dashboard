import React, {useEffect, useState} from 'react';
import {
    Flex,
    Heading,
    Text
} from "@chakra-ui/react";
import Login from "../login/Login";
import Cookies from "js-cookie";

const LoggedOutUI: React.FC = () => {

    const [isInvalidUser, setIsInvalidUser] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;

        if (path === '/invalid-user' && !Cookies.get('hash')) {
            setIsInvalidUser(true);
        }
    }, []);

    return (
        <>
            <Flex p={2} fontSize='xl' alignItems='center' justifyContent='center' direction='column' height='100vh'>
                <Heading>GS Analytics Dashboard</Heading>

                <Text color='gray.400'>Please log in to view the dashboard.</Text>

                <Login/>

                {
                    isInvalidUser &&
                    <Text fontSize="sm" color="red.400">You are not an organization member. Please contact the
                        administrator to get access to the dashboard.</Text>
                }
            </Flex>
        </>
    );
};

export default LoggedOutUI;