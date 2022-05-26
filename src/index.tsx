import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {ChakraProvider} from '@chakra-ui/react'
import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
axios.get('http://localhost:8001/sanctum/csrf-cookie').then(response => {
    // Login...
});
// axios.defaults.headers.common['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN') ?? '';

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <App/>
        </ChakraProvider>
    </React.StrictMode>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
