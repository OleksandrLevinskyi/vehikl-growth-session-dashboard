import GrafanaDashboard from "./components/grafana_dashboard/GrafanaDashboard";
import NodeGraph from "./components/node_graph/NodeGraph";
import HeatMap from "./components/heat_map/HeatMap";
import React from "react";
import {useColorMode} from "@chakra-ui/react";
import {RouteObject} from "react-router-dom";
import {COLOR_MODE} from "./types/Types";

const ConfiguredGrafanaDashboard: React.VFC = () => {
    const {colorMode} = useColorMode();

    return (
        <GrafanaDashboard colorMode={colorMode as COLOR_MODE}/>
    );
}

export const routes: RouteObject[] = [
    {
        path: 'dashboard',
        element: <ConfiguredGrafanaDashboard/>
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