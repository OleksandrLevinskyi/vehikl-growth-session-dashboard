import {Connection, NodeSummary} from "./NodeSummary";
import {Edge, EdgeDictionary, Node, NodeDictionary} from "../../../types/Types";

export class Graph {
    nodes: any;
    edges: any;

    constructor(nodes: Array<Node>, edges: Array<Edge>) {
        this.nodes = nodes;
        this.edges = edges;
    }

    getNodeInfo(node: Node, connections: Array<number>, nodeDictionary: NodeDictionary, edgeDictionary: EdgeDictionary) {
        const modifiedConnections = connections.map((connectionId: number) => ({
            id: connectionId,
            name: nodeDictionary[connectionId],
            weight: (connectionId > node.id ?
                edgeDictionary[`${connectionId}_${node.id}`] :
                edgeDictionary[`${node.id}_${connectionId}`]) ?? 0,
        })).filter((con: Connection) => con.weight !== 0);

        return new NodeSummary(node.id, node.name, modifiedConnections);
    }
}