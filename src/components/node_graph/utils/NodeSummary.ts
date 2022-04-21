export type Connection = {
    id: number,
    name: string,
    weight: number
}

export class NodeSummary {
    id: number;
    name: string;
    connections: Array<Connection>;
    formatted_connections: Array<string>;

    constructor(id: number, name: string, connections: Array<Connection>) {
        this.id = id;
        this.name = name;
        this.connections = connections;

        this.formatted_connections = this.connections.sort((a, b) => b.weight - a.weight)
            .map((connection: Connection) => `${connection.name}: ${connection.weight} time(s)`);
    }
}