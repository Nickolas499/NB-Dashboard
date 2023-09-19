import { createContext, useContext, useState } from "react";
import { getGlobalData,getUserData } from "../api/chartData";

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
    const [GlobalData, setGlobalData] = useState([]);
    const [UserData, setUserData] = useState([]);


    const GetGlobalData= async () => {
      try {
        const res = await getGlobalData();
        setGlobalData(res.data);
       
      } catch (error) {
        console.log(error);
      }
    };


    const GetUserData= async () => {
      try {
        const res = await getUserData();
        console.log(res.data);
        setUserData(res.data);
       
      } catch (error) {
        console.log(error);
      }
    }


    return (
        <graphContext.Provider
          value={{ 
            GlobalData,
            GetGlobalData,
            UserData,
            GetUserData
            }}
        >
          {children}
        </graphContext.Provider>
      );

  }