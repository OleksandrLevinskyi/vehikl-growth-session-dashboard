import {Button, Center, Flex, Image, Link} from "@chakra-ui/react";
import React, {useContext} from "react";
import {LoginContext} from "../../providers/LoginContextProvider";
import {BsGithub} from "react-icons/bs";

const Login: React.FC = () => {

    const {loggedInUser, setLoggedInUser} = useContext(LoginContext);

    return <>
        {
            !loggedInUser ?
                <Link color="light-blue" size="large" padding={3}
                      href={`${process.env.REACT_APP_API_URL}/login/github`}>
                    <Button size='lg' rightIcon={<BsGithub size='25'/>}>
                        LOG IN WITH
                    </Button>
                </Link>
                :
                <Flex>
                    <Center>
                        <Image
                            borderRadius="full"
                            boxSize="40px"
                            src={loggedInUser.avatar}
                            alt="User Icon"
                        />
                    </Center>
                    <Link color="light-blue" size="large" padding={3} href={`${process.env.REACT_APP_API_URL}/logout`}
                          onClick={() => setLoggedInUser(null)}>
                        LOG OUT
                    </Link>
                </Flex>
        }
    </>;
}

export default Login;