import { createContext, useContext, useState } from "react";
import {createWorkasignment} from "../api/workasignmet.js";


const WorkContext = createContext();

export const useWork = () => {
    const context = useContext(WorkContext);
    if (!context) {
        throw new Error("useWork must be used within a Work Provider");
    }
    return context;
}


export const WorkProvider = ({ children }) => {
    

    const CreateWork = async (data) => {
        const res = await createWorkasignment(data);
        console.log(res);
    };
    return (
        <WorkContext.Provider value={{ CreateWork }}>
            {children}
        </WorkContext.Provider>
    )
}

