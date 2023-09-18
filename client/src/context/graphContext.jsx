import { createContext, useContext, useState } from "react";
import { getGraphData } from "../api/chartData";

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
    const [GraphData, setGraphData] = useState([]);


    const GetGraphData= async () => {
      try {
        const res = await getGraphData();
        setGraphData(res.data);
       
      } catch (error) {
        console.log(error);
      }
    };


    return (
        <graphContext.Provider
          value={{ 
            GraphData,
            GetGraphData
            }}
        >
          {children}
        </graphContext.Provider>
      );

  }