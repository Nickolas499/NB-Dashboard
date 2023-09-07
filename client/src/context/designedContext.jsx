import { createContext, useContext, useState } from "react";
import {
  createDesigned,
  getDesigned,
  getDesignedById,
  updateDesigned,
  deleteDesigned,
} from "../api/designed";

const designedContext = createContext();
export const useDesigned = () => {
  const context = useContext(designedContext);
  if (!context) {
    throw new Error("useDesigned must be used within a Designed Provider");
  }
  return context;
};

export function DesignedProvider({ children }) {
  const [Designed, setDesigned] = useState([]);

  //======================================((Create Redesigned API))==============================================//
  const CreateDesigned = async (data) => {
    const res = await createDesigned(data);
    console.log(res);
  };
  //======================================((Get Redesigned API))==============================================//
  const GetDesigned = async () => {
    try {
      const res = await getDesigned();
      setDesigned(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //======================================((Get Redesigned By ID API))==============================================//
  const GetDesignedById = async (id) => {
    try {
      const res = await getDesignedById(id);
      setDesigned(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //======================================((Update Redesigned API))==============================================//
  const UpdateDesigned = async (id, data) => {
    try {
      await updateDesigned(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  //====================================((Delete Redesigned API))==============================================//
  const DeleteDesigned = async (id) => {
    try {
      await deleteDesigned(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <designedContext.Provider
      value={{
        Designed,
        CreateDesigned,
        GetDesigned,
        GetDesignedById,
        UpdateDesigned,
        DeleteDesigned,
      }}
    >
      {children}
    </designedContext.Provider>
  );
}
