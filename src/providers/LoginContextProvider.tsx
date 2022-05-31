import React, {useEffect, useState} from 'react';
import {LoginContextType, User} from "../types/Types";
import Cookies from "js-cookie";
import axios from "axios";

export const LoginContext = React.createContext<LoginContextType>({} as LoginContextType);

const LoginContextProvider: React.FC = ({children}) => {

    const [loggedInUser, setLoggedInUser] = useState<User | null>();

    useEffect(() => {
        const hashToken = Cookies.get('hash');
        let unmounted = false;

        if (!hashToken) return;

        const getUserFromApi = async () => {
            const user = await axios.get(`http://localhost:8001/api/social_user/${hashToken}`);

            if (!unmounted && user) setLoggedInUser(user.data);
        }

        getUserFromApi();

        return () => {
            unmounted = true;
        }
    }, []);

    return (
        <LoginContext.Provider value={{loggedInUser, setLoggedInUser}}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;