import { createContext, useContext, useState } from "react";
import {
  CreateRegistration,
  getRegistration  
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
  

  //======================================((Create Registration API))==============================================//

  const createRegistration = async (data) => {
    const res = await CreateRegistration(data);
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

  return (
    <registrationContext.Provider
      value={{ registration, createRegistration, GetRegistration }}
    >
      {children}
    </registrationContext.Provider>
  );
}
