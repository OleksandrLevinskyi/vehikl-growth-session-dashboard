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
            const [nodegraph, heatmap] = await Promise.all([axios.get('http://localhost:8000/nodegraph'), axios.get('http://localhost:8000/heatmap')]);

            let graph = new Graph(nodegraph.data as any);
            let nodeSummaries = [...(nodegraph.data as any).nodes].map((node: Node) => graph.getNodeInfo(node));

            if(!unmounted) setData({nodeSummaries, nodegraph: nodegraph.data, heatmap: heatmap.data})
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