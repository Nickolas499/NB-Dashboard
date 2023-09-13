//=========((IMPORTS))=============================================
import { createContext, useContext, useState } from "react";
import {
  createRegistration,
  getRegistration,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
} from "../api/registration";

//======================================((REGISTRATION CONTEXT))==============================================//
const registrationContext = createContext();

export const useRegistration = () => {
  const context = useContext(registrationContext);  
  if (!context) {
    throw new Error(
      "useRegistration must be used within a Registration Provider"
    );
  }
  return context;
};
//==================================((REGISTRATION PROVIDER))==============================================//
export function RegistrationProvider({ children }) {
  const [Registration, setRegistration] = useState([]);

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
  };
  //==================================((Update Registration API))===============================================//
  const UpdateRegistration = async (id, data) => {
    try {
      await updateRegistration(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  //==================================((Delete Registration API))===============================================//
  const DeleteRegistration = async (id) => {
    try {
      await deleteRegistration(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <registrationContext.Provider
      value={{
        Registration,
        CreateRegistration,
        GetRegistration,
        GetRegistrationById,
        UpdateRegistration,
        DeleteRegistration,
        
      }}
    >
      {children}
    </registrationContext.Provider>
  );
}
