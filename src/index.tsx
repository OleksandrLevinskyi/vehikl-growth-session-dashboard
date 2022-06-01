import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react'
import axios from "axios";
import LoginContextProvider from "./providers/LoginContextProvider";

axios.defaults.withCredentials = true;
axios.get(`${process.env.REACT_APP_API_URL}/sanctum/csrf-cookie`).then(response => {
    // Login...
});

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <LoginContextProvider>
                <App/>
            </LoginContextProvider>
        </ChakraProvider>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
