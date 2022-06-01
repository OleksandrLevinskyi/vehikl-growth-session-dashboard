import React, {useContext} from "react";
import "./App.css";
import {LoginContext} from "../../providers/LoginContextProvider";
import LoggedInUI from "../logged_in_ui/LoggedInUI";
import LoggedOutUI from "../logged_out_ui/LoggedOutUI";

const App: React.FC = () => {

    const {loggedInUser} = useContext(LoginContext);

    return (
        <>
            {loggedInUser ? <LoggedInUI/> : <LoggedOutUI/>}
        </>
    );
};

export default App;