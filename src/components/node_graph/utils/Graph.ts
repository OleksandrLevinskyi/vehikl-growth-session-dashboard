import {Connection, NodeSummary} from "./NodeSummary";
import {Node, NodeGraphType} from "../../../types/Types";

export class Graph {
    data: any;

    constructor(data: NodeGraphType) {
        this.data = data;
    }

    getNodeInfo(node: Node) {
        let id = node.id;

        let connections = [...this.data.edges]
            .filter((edge: any) => edge.source === id || edge.target === id)
            .map((edge: any): Connection => {
                return {id: edge.source === id ? edge.target : edge.source, name: "", weight: edge.weight};
            })
            .sort((a, b) => b.weight - a.weight);

        connections.forEach((connection: Connection) => {
            connection.name = this.data.nodes.filter((node: any) => node.id === connection.id)[0].name ?? "";
        });

        return new NodeSummary(node.id, node.name, connections);
    }
}