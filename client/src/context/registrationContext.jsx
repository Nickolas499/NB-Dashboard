import { createContext, useContext, useState } from "react";
import {
  createRegistration,
  getRegistration,
  createScaned,
  getScaned,  
} from "../api/registration";

const registrationContext = createContext();

export const useRegistration = () => {
  const context = useContext(registrationContext);
  if (!context) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
};

export function RegistrationProvider({ children }) {
  const [registration, setRegistration] = useState([]);
  const [scaned, setScaned] = useState([]);
  

  //======================================((Create Registration API))==============================================//
  const CreateRegistration = async (data) => {
    const res = await createRegistration(data);
    console.log(res);
  };

  //======================================((Get Registration API))==============================================//
  const GetRegistration = async () => {
    try {
      const res = await getRegistration();
      setRegistration(res.data);      
    } catch (error) {
      console.log(error);
    }
    
  };
  //==================================((Get Registration By Id API))============================================//
  //==================================((Update Registration API))===============================================//
  //==================================((Delete Registration API))===============================================//

  
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
    <registrationContext.Provider
      value={{ registration, CreateRegistration, GetRegistration,scaned,GetScaned,CreateScaned }}
    >
      {children}
    </registrationContext.Provider>
  );
}