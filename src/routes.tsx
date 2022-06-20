import GrafanaDashboard from "./components/grafana_dashboard/GrafanaDashboard";
import NodeGraph from "./components/node_graph/NodeGraph";
import HeatMap from "./components/heat_map/HeatMap";
import React, {useEffect, useState} from "react";
import {useColorMode} from "@chakra-ui/react";
import {RouteObject} from "react-router-dom";
import {COLOR_MODE} from "./types/Types";
import axios from "axios";

const ConfiguredGrafanaDashboard: React.VFC = () => {
    const {colorMode} = useColorMode();

    return (
        <GrafanaDashboard colorMode={colorMode as COLOR_MODE}/>
    );
}

const Auth: React.FC = () => {

    const [htmlFile, setHtmlFile] = useState(null);

    useEffect(() => {

        const autheticate = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_GRAFANA_PROXY_URL}/login` ?? "",
                    {"user": "admin", "password": "vehikl"});
                console.log(response)

                window.location.href = "http://localhost:3006/d/omSaqBCnk/gsad?orgId=1";
            } catch (e) {
                console.log('error:', e)
            }
        }

        autheticate();

    }, []);
    return (
        <>
        </>
    );
}

export const routes: RouteObject[] = [
    {
        path: 'dashboard',
        element: <ConfiguredGrafanaDashboard/>
    },
    {
        path: 'auth',
        element: <Auth/>
    },
    {
        path: 'node-graph',
        element: <NodeGraph/>
    },
    {
        path: 'heat-map',
        element: <HeatMap/>
    },
    {
        path: '*',
        element: <ConfiguredGrafanaDashboard/>
    },
];