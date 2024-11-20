import { createContext, useContext, useState, useEffect } from "react";
import {
    get_registration,
    post_registration,
    update_registration,
    delete_registration
} from "../api/production";

export const ProductionContext = createContext();

export const useProduction = () => {
    const context = useContext(ProductionContext);
    if(!context) {
        throw new Error("useAuth must be used within a AssignProvider");
    }
    return context;
}


export const ProductionProvider = ({ children }) => {
    const [Registation, setRegistation] = useState([]);
    const [loading, setLoading] = useState(true);



//=====================================[ User Job Assignment ]=====================================\\
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

    return (
        <ProductionContext.Provider  value={{Registation, get_Registration, Create_Registation, Update_Registation, Delete_Registration, loading }}>
            {children}
        </ProductionContext.Provider>
    )
}
