import { createContext, useContext, useState, useEffect } from "react";
import {
    createJobassignment,
    getJobassignment,
    getJobassignmentById,
    updateJobassignment,
    deleteJobassignment
} from "../api/jobAssignmets";

export const assignContext = createContext();

export const useAssign = () => {
    const context = useContext(assignContext);
    if(!context) {
        throw new Error("useAuth must be used within a AssignProvider");
    }
    return context;
}


export const AssignProvider = ({ children }) => {

    const [assign, setAssign] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetAssign = async () => {
        try {
            const res = await getJobassignment();
            setAssign(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const CreateAssign = async (data) => {
        try {
            await createJobassignment(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <assignContext.Provider  value={{GetAssign, assign, loading, CreateAssign}}>
            {children}
        </assignContext.Provider>
    )
}
