import { createContext, useContext, useState } from "react";
import {
  createScaned,
  getScaned,   
} from "../api/scaned";

const scanedContext = createContext();

export const useScaned = () => {
  const context = useContext(scanedContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};

export function RegistrationProvider({ children }) {  
  const [Scaned, setScaned] = useState([]);
  


  
   //======================================((Create Scaned API))==============================================//
   const CreateScaned = async (data) => {
    const res = await createScaned(data);
    console.log(res);
  };

  //======================================((Get Scaned API))==============================================//
  const GetScaned = async () => {
    try {
      const res = await getScaned();
      setScaned(res.data);      
    } catch (error) {
      console.log(error);
    }
    
  };
  //==================================((Get Scaned By Id API))============================================//
  //==================================((Update Scaned API))===============================================//
  //==================================((Delete Scaned API))===============================================//


  return (
    <scanedContext.Provider
      value={{Scaned, GetScaned, CreateScaned }}
    >
      {children}
    </scanedContext.Provider>
  );
}
