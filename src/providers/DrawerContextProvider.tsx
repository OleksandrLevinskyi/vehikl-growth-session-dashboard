import React, {useState} from 'react';
import {DrawerContextType} from "../types/Types";
import {DRAWER_TYPE} from "../components/node_graph/NodeGraph";

export const DrawerContext = React.createContext<DrawerContextType>({} as DrawerContextType);

const DrawerContextProvider: React.FC = ({children}) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [currentDrawerType, setCurrentDrawerType] = useState<string>(DRAWER_TYPE.DEFAULT);

    return (
        <DrawerContext.Provider value={{isDrawerOpen, setIsDrawerOpen, currentDrawerType, setCurrentDrawerType}}>
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerContextProvider;