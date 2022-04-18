import React from 'react';
import {BrowserRouter, useRoutes} from "react-router-dom";
import {routes} from "../../routes";

const RoutesList: React.VFC = () => {
    return useRoutes(routes);
}

const RouterProvider: React.FC = ({children}) => {
    return (
        <BrowserRouter>
            {children}

            <RoutesList/>
        </BrowserRouter>
    );
};

export default RouterProvider;