import { createContext, useContext, useState } from "react";
import {
  createRedesigned,
  getRedesigned,
  getRedesignedById,
  updateRedesigned,
  deleteRedesigned,
} from "../api/redesigned";

const redesignedContext = createContext();
export const useRedesigned = () => {
  const context = useContext(redesignedContext);
  if (!context) {
    throw new Error("useRedesigned must be used within a Redesigned Provider");
  }
  return context;
};

export function RedesignedProvider({ children }) {
  const [Redesigned, setRedesigned] = useState([]);

  //======================================((Create Redesigned API))==============================================//
  const CreateRedesigned = async (data) => {
    const res = await createRedesigned(data);
    console.log(res);
  };
  //======================================((Get Redesigned API))==============================================//
  const GetRedesigned = async () => {
    try {
      const res = await getRedesigned();
      setRedesigned(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //======================================((Get Redesigned By ID API))==============================================//
  const GetRedesignedById = async (id) => {
    try {
      const res = await getRedesignedById(id);
      setRedesigned(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //======================================((Update Redesigned API))==============================================//
  const UpdateRedesigned = async (id, data) => {
    try {
      await updateRedesigned(id, data);
    } catch (error) {
      console.log(error);
    }
  };
  //====================================((Delete Redesigned API))==============================================//
  const DeleteRedesigned = async (id) => {
    try {
      await deleteRedesigned(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <redesignedContext.Provider
      value={{
        Redesigned,
        CreateRedesigned,
        GetRedesigned,
        GetRedesignedById,
        UpdateRedesigned,
        DeleteRedesigned,
      }}
    >
      {children}
    </redesignedContext.Provider>
  );
}
