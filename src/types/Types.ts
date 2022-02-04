export type User = {
    id: number;
    github_nickname: string;
    name: string;
    avatar: string;
    is_vehikl_member: boolean;
}

export type NodeGraphType = {
    nodes: Array<Node>,
    edges: Array<Edge>
}

export type Node = {
    id: number,
    index: number,
    name: string,
    vx: number,
    vy: number,
    x: number,
    y: number
}

export type Edge = {
    source: Node,
    target: Node,
    weight: number,
    index: number
}