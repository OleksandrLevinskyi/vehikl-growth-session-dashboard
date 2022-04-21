import React, {useEffect, useState} from 'react';
import {Graph} from "./components/node_graph/utils/Graph";
import {DataContextType, Node} from "./types/Types";
import axios from "axios";

export const DataContext = React.createContext<DataContextType>({} as DataContextType);

const DataContextProvider: React.FC = ({children}) => {

    const [data, setData] = useState<any>({});

    useEffect(() => {
        let unmounted = false;

        const func = async () => {
            const [
                nodes,
                edges,
                nodeDictionary,
                edgeDictionary,
                connections,
            ] = await Promise.all([
                axios.get('http://localhost:8000/nodes'),
                axios.get('http://localhost:8000/edges'),
                axios.get('http://localhost:8000/dictionary/nodes'),
                axios.get('http://localhost:8000/dictionary/edges'),
                axios.get('http://localhost:8000/dictionary/connections'),
            ]);

            let graph = new Graph(nodes.data, edges.data);
            let nodeSummaries = [...nodes.data].map((node: Node) => graph.getNodeInfo(node, connections.data[node.id.toString()], nodeDictionary.data, edgeDictionary.data));

            if (!unmounted) setData({
                nodeSummaries,
                nodes: nodes.data,
                edges: edges.data,
                nodeDictionary: nodeDictionary.data,
                edgeDictionary: edgeDictionary.data,
                connections: connections.data
            })
        }

        func();

        return () => {
            unmounted = true;
        }
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContextProvider;