import {User} from "../../types/Types";
import {Center, Flex, Image, Link} from "@chakra-ui/react";
import React from "react";

interface ILoginProps {
    loggedInUser: User | null | undefined,
    onClick: () => void
}

const Login: React.FC<ILoginProps> = ({loggedInUser, onClick}) => {
    return <>
        {
            !loggedInUser ?
                <Link color="light-blue" size="large" padding={3}
                      href="http://localhost:8000/login/github">
                    LOG IN
                </Link>
                :
                <Flex onClick={onClick}>
                    <Center>
                        <Image
                            borderRadius="full"
                            boxSize="40px"
                            src={loggedInUser.avatar}
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

export default Login;