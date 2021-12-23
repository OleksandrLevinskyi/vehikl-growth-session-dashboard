import {Connection, NodeSummary} from "./NodeSummary";

export class Graph {
    data: any;

    constructor(data: any) {
        this.data = data;
    }

    getNodeInfo(node: any) {
        let id = node.id;

        let connections = [...this.data.edges]
            .filter((edge: any) => edge.source === id || edge.target === id)
            .map((edge: any): Connection => {
                return {name: edge.source === id ? edge.target : edge.source, weight: edge.weight};
            })
            .sort((a, b) => b.weight - a.weight);

        connections.forEach((connection: Connection) => {
            connection.name = this.data.nodes.filter((node: any) => node.id === connection.name)[0].name ?? null;
        });

        return new NodeSummary(node.id, node.name, connections);
    }
}