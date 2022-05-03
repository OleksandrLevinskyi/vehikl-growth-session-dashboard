import {User} from "../../types/Types";
import {Center, Flex, Image, Link} from "@chakra-ui/react";
import React from "react";

export const Login = (props: { loggedInUser: User | null | undefined, onClick: () => void }) => {
    return <>
        {
            !props.loggedInUser ?
                <Link color="light-blue" size="large" padding={3}
                      href="http://localhost:8000/login/github">
                    LOG IN
                </Link>
                :
                <Flex onClick={props.onClick}>
                    <Center>
                        <Image
                            borderRadius="full"
                            boxSize="40px"
                            src={props.loggedInUser.avatar}
                            alt="User Icon"
                        />
                    </Center>
                    <Link color="light-blue" size="large" padding={3} href="#">
                        LOG OUT
                    </Link>
                </Flex>
        }
    </>;
}