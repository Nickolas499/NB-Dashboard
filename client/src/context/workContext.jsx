import { createContext, useContext, useState } from "react";
import {createWorkasignment, getWorkasignment, getWorkasignmentById, updateWorkasignment, deleteWorkasignment} from "../api/workasignmet.js";


const WorkContext = createContext();

export const useWork = () => {
    const context = useContext(WorkContext);
    if (!context) {
        throw new Error("useWork must be used within a Work Provider");
    }
    return context;
}


export const WorkProvider = ({ children }) => {
    // const [Work, setWork] = useState([]);

    const CreateWork = async (data) => {
        const res = await createWorkasignment(data);
        console.log(res);
    };

    const GetWork = async () => {
        const res = await getWorkasignment();
        console.log(res);
    }

    const GetWorkById = async (id) => {
        const res = await getWorkasignmentById(id);
        console.log(res);
    }

    const UpdateWork = async (id, data) => {
        const res = await updateWorkasignment(id, data);
        console.log(res);
    }

    const DeleteWork = async (id) => {
        const res = await deleteWorkasignment(id);
        console.log(res);
    }
    return (
        <WorkContext.Provider value={{ CreateWork, GetWork, GetWorkById, UpdateWork, DeleteWork }}>
            {children}
        </WorkContext.Provider>
    )
}

