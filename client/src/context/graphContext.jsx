import { createContext, useContext, useState } from "react";
import { GlobalDatarequest,UserDatarequest } from "../api/chartData";

const graphContext = createContext();

export const useGraph = () => {
    const context = useContext(graphContext);
    if (!context) {
      throw new Error(
        "useChart must be used within a ChartProvider"
      );
    }
    return context;
  };

  export function GraphProvider({ children }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks    
    const [GlobalDataApi, setGlobalDataApi] = useState([]);
    const [User, setUser] = useState([]);

    const GlobalApi = async () => {
      try {
        const res = await GlobalDatarequest();
        setGlobalDataApi(res.data);
       
      } catch (error) {
        console.log(error);
      }
    }

    const UserApi = async (id) => {
      try {
        const res = await UserDatarequest(id);
        setUser(res.data);
       
      } catch (error) {
        console.log(error);
      }
    }


    return (
        <graphContext.Provider
          value={{            
            GlobalDataApi,
            GlobalApi,
            User,
            UserApi
            }}
        >
          {children}
        </graphContext.Provider>
      );

  }