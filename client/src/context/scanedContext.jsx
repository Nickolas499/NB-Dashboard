//=================================((IMPORTS))==============================================//
import { createContext, useContext, useState } from "react";
import {
  createScaned,
  getScaned,
  getScanedById,
  updateScaned,
  deleteScaned,
} from "../api/scaned";

//======================================((SCANED CONTEXT))==============================================//
const scanedContext = createContext();

export const useScaned = () => {
  const context = useContext(scanedContext);
  if (!context) {
    throw new Error("useScaned must be used within a Scaned Provider");
  }
  return context;
};
//==================================((SCANED PROVIDER))==============================================//
export function ScanedProvider({ children }) {
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
      setScaned(res.data.scaned);      
    } catch (error) {
      console.log(error);
    }
  };
  //==================================((Get Scaned By Id API))============================================//
  const GetScanedById = async (id) => {
    try {
      const res = await getScanedById(id);
      setScaned(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //==================================((Update Scaned API))===============================================//
  const UpdateScaned = async (id, data) => {
    try {
      await updateScaned(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  //==================================((Delete Scaned API))===============================================//
  const DeleteScaned = async (id) => {
    try {
      await deleteScaned(id);
    } catch (error) {
      console.log(error);
    }
  };
    
  return (
    <scanedContext.Provider
      value={{           
        Scaned,        
        CreateScaned,
        GetScaned,
        GetScanedById,
        UpdateScaned,
        DeleteScaned,
      }}
    >
      {children}
    </scanedContext.Provider>
  );
}
