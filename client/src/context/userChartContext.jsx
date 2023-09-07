import { createContext, useContext, useState } from "react";


export const useChart = () => {
    const context = useContext(chartContext);
    if (!context) {
      throw new Error(
        "useChart must be used within a ChartProvider"
      );
    }
    return context;
  };

  export function chartProvider({ children }) {
    const [productivity, setProductivity] = useState([]);
 


    return (
        <chartContext.Provider
          value={{ 
            productivity,
            }}
        >
          {children}
        </chartContext.Provider>
      );

  }