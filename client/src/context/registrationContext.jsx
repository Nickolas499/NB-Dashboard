import { createContext, useContext, useState } from "react";
import {
  createRegistration,
  getRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,     
} from "../api/registration";

// eliminar este codigo===============================================================================
import {createScaned,
  getScaned, } from "../api/scaned";
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
  const [Registration, setRegistration] = useState([]);
  // eliminar este codigo===============================================================================
  const [Scaned, setScaned] = useState([]);
  

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
const GetRegistrationById = async (id) => {
  try {
    const res = await getRegistrationById(id);
    setRegistration(res.data);
  } catch (error) {
    console.log(error);
  }
}
  //==================================((Update Registration API))===============================================//
const UpdateRegistration = async (id, data) => {
  try {
    await updateRegistration(id, data);
  } catch (error) {
    console.log(error);
  }
}
  //==================================((Delete Registration API))===============================================//
const DeleteRegistration = async (id) => {
  try {
    await deleteRegistration(id);
  } catch (error) {
    console.log(error);
  }
}




  // eliminar este codigo===============================================================================
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
      value={{ 
        Registration,
        CreateRegistration,
        GetRegistration, 
        DeleteRegistration,
        GetRegistrationById,
        UpdateRegistration, 
        Scaned,
        GetScaned, 
        CreateScaned }}
    >
      {children}
    </registrationContext.Provider>
  );
}
