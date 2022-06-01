import {Center, Flex, Image, Link} from "@chakra-ui/react";
import React, {useContext} from "react";
import {LoginContext} from "../../providers/LoginContextProvider";

const Login: React.FC = () => {

    const {loggedInUser, setLoggedInUser} = useContext(LoginContext);

    return <>
        {
            !loggedInUser ?
                <Link color="light-blue" size="large" padding={3}
                      href={`${process.env.REACT_APP_API_URL}/login/github`}>
                    LOG IN
                </Link>
                :
                <Flex onClick={() => setLoggedInUser(null)}>
                    <Center>
                        <Image
                            borderRadius="full"
                            boxSize="40px"
                            src={loggedInUser.avatar}
                            alt="User Icon"
                        />
                    </Center>
                    <Link color="light-blue" size="large" padding={3} href={`${process.env.REACT_APP_API_URL}/logout`}>
                        LOG OUT
                    </Link>
                </Flex>
        }
    </>;
}

export default Login;