export type User = {
    id: number;
    github_nickname: string;
    name: string;
    avatar: string;
    is_vehikl_member: boolean;
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
    source: number,
    target: number,
    weight: number,
}

export type DataContextType = {
    nodes: any,
    edges: any,
    nodeDictionary: any,
    edgeDictionary: any,
    connections: any,
}

export type DrawerContextType = {
    isDrawerOpen: boolean,
    setIsDrawerOpen: any,
    currentDrawerType: string,
    setCurrentDrawerType: any,
}

export type LoginContextType = {
    loggedInUser: any,
    setLoggedInUser: any,
}

export type NodeDictionary = {
    [key: string]: string,
}

export type EdgeDictionary = {
    [key: string]: number,
}

export enum COLOR_MODE {
    LIGHT = "light",
    DARK = "dark"
}