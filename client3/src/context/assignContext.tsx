import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
    createJobassignment,
    getJobassignment,
    getJobassignmentById,
    updateJobassignment,
    deleteJobassignment
} from "../api/jobAssignmets";
interface WorkData {
    LS3:number,
    ZEISS:number,
    SHAPE:number,
    IBO_DESIGN:number,
    DIGI_ABUT:number,
    PHIS_ABUT:number,
    FULL_ARCH:number,
    DATE:string,     
}

interface AssignContextType {
    GetAssign: () => Promise<void>;
    assign: WorkData[]; // Cambia 'any' por un tipo más específico si es posible
    loading: boolean;
    CreateAssign: (data: WorkData) => Promise<void>; // Cambia 'any' por un tipo más específico si es posible
}

export const assignContext = createContext<AssignContextType | undefined>(undefined);

export const useAssign = () => {
    const context = useContext(assignContext);
    if (!context) {
        throw new Error("useAssign must be used within an AssignProvider");
    }
    return context;
}

interface AssignProviderProps {
    children: ReactNode;
}

export const AssignProvider: React.FC<AssignProviderProps> = ({ children }) => {
    const [assign, setAssign] = useState<WorkData[]>([]); // Cambia 'any' por un tipo más específico si es posible
    const [loading, setLoading] = useState<boolean>(true);

    const GetAssign = async () => {
        try {
            const res = await getJobassignment();
            setAssign(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const CreateAssign = async (data: WorkData) => { // Cambia 'any' por un tipo más específico si es posible
        try {
            await createJobassignment(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetAssign();
    }, []);

    return (
        <assignContext.Provider value={{ GetAssign, assign, loading, CreateAssign }}>
            {children}
        </assignContext.Provider>
    )
}
