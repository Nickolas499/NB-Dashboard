import { createContext, useContext, useState, } from "react";
import {
    get_registration, post_registration, update_registration, delete_registration,
    get_scan, post_scan, update_scan, delete_scan,
    get_design, post_design, update_design, delete_design,
    get_redesign, post_redesign, update_redesign, delete_redesign,
} from "../api/production";

export const ProductionContext = createContext();

export const useProduction = () => {
    const context = useContext(ProductionContext);
    if (!context) {
        throw new Error("useAuth must be used within a AssignProvider");
    }
    return context;
}


export const ProductionProvider = ({ children }) => {
    const [Registation, setRegistation] = useState([]);
    const [Scan, setScan] = useState([]);
    const [Design, setDesign] = useState([]);
    const [Redesign, setRedesign] = useState([]);
    const [loading, setLoading] = useState(true);


    //=====================================[ REGISTRATION ]=====================================\\
    const get_Registration = async () => {
        try {
            const res = await get_registration();
            setRegistation(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const Create_Registation = async (data) => {
        try {
            await post_registration(data);
            get_Registration();
        } catch (error) {
            console.log(error);
        }
    }

    const Update_Registation = async (id, data) => {
        try {
            await update_registration(id, data);
            get_Registration();
        } catch (error) {
            console.log(error);
        }
    }

    const Delete_Registration = async (id) => {
        try {
            await delete_registration(id);
            // Opcional: Actualizar la lista de usuarios después de eliminar
            get_Registration();
        } catch (error) {
            console.log(error);
        }
    };


    //=====================================[ SCAN ]=====================================\\
    const get_Scan = async () => {
        try {
            const res = await get_scan();
            setScan(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const Create_Scan = async (data) => {
        try {
            await post_scan(data);
            get_Scan();
        } catch (error) {
            console.log(error);
        }
    }

    const Update_Scan = async (id, data) => {
        try {
            await update_scan(id, data);
            get_Scan();
        } catch (error) {
            console.log(error);
        }
    }

    const Delete_Scan = async (id) => {
        try {
            await delete_scan(id);
            get_Scan();
        } catch (error) {
            console.log(error);
        }
    };

    //=====================================[ DESIGN ]=====================================\\
    const get_Design = async () => {
        try {
            const res = await get_design();
            setDesign(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const Create_Design = async (data) => {
        try {
            await post_design(data);
            get_Design();
        } catch (error) {
            console.log(error);
        }
    }

    const Update_Design = async (id, data) => {
        try {
            await update_design(id, data);
            get_Design();
        } catch (error) {
            console.log(error);
        }
    }

    const Delete_Design = async (id) => {
        try {
            await delete_design(id);
            get_Design();
        } catch (error) {
            console.log(error);
        }
    };

    //=====================================[ REDESIGN ]=====================================\\
    const get_Redesign = async () => {
        try {
            const res = await get_redesign();
            setRedesign(res.data);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const Create_Redesign = async (data) => {
        try {
            await post_redesign(data);
            get_Redesign();
        } catch (error) {
            console.log(error);
        }
    }

    const Update_Redesign = async (id, data) => {
        try {
            await update_redesign(id, data);
            get_Redesign();
        } catch (error) {
            console.log(error);
        }
    }

    const Delete_Redesign = async (id) => {
        try {
            await delete_redesign(id);
            get_Redesign();
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <ProductionContext.Provider value={
            {
                Registation, get_Registration, Create_Registation, Update_Registation, Delete_Registration,
                Scan, get_Scan, Create_Scan, Update_Scan, Delete_Scan,
                Design, get_Design, Create_Design, Update_Design, Delete_Design,
                Redesign, get_Redesign, Create_Redesign, Update_Redesign, Delete_Redesign,
                loading
            }
        }>
            {children}
        </ProductionContext.Provider>
    )
}
