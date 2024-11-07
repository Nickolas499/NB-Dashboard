import { createContext, useContext, useState, useEffect } from "react";
import {
    get_queue_volume,
    post_queue_volume,
    update_queue_volume,
    get_userJobAssignment,
    post_userJobAssignment,
    update_userJobAssignment
} from "../api/queuevolume";

export const assignContext = createContext();

export const useAssign = () => {
    const context = useContext(assignContext);
    if(!context) {
        throw new Error("useAuth must be used within a AssignProvider");
    }
    return context;
}


export const AssignProvider = ({ children }) => {

    const [queuevolume, setqueuevolume] = useState([]);
    const [userJobAssignment, setuserJobAssignment] = useState([]);
    const [loading, setLoading] = useState(true);

//=====================================[ Queue Volume ]=====================================\\
    const GetQueue = async () => {
        try {
            const res = await get_queue_volume();
            setqueuevolume(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const CreateQueue = async (data) => {
        try {
            await post_queue_volume(data);
        } catch (error) {
            console.log(error);
        }
    }

//=====================================[ User Job Assignment ]=====================================\\
    const GetUserJobAssignment = async () => {
        try {
            const res = await get_userJobAssignment();
            setuserJobAssignment(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const CreateUserJobAssignment = async (data) => {
        try {
            await post_userJobAssignment(data);
            GetUserJobAssignment();
        } catch (error) {
            console.log(error);
        }
    }   

    const UpdateUserJobAssignment = async (id, data) => {
        try {
            await update_userJobAssignment(id, data);
            GetUserJobAssignment();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <assignContext.Provider  value={
            {GetQueue, queuevolume, loading, CreateQueue,
             GetUserJobAssignment, userJobAssignment, CreateUserJobAssignment, UpdateUserJobAssignment
             }}>
            {children}
        </assignContext.Provider>
    )
}
