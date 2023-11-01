//=================================((IMPORTS))==============================================//
import { createContext, useContext, useState } from "react";
import {
  createWorkasignment,
  getWorkasignment,
  getWorkasignmentById,
  updateWorkasignment,
  deleteWorkasignment,
} from "../api/workasignmet.js";

import {
  createJobasignment,
  getJobasignment,
  getJobasignmentById,
  updateJobasignment,
  deleteJobasignment,
} from "../api/workasignmet.js";

//======================================((WORK CONTEXT))==============================================//
const WorkContext = createContext();

export const useWork = () => {
  const context = useContext(WorkContext);
  if (!context) {
    throw new Error("useWork must be used within a Work Provider");
  }
  return context;
};

//==================================((WORK PROVIDER))===========================================================//
export const WorkProvider = ({ children }) => {
  const [Work, setWork] = useState([]);
  const [Job, setJob] = useState([]);

  //======================================((Create Work API))===================================================//
  const CreateWork = async (data) => {
    const res = await createWorkasignment(data);
    //console.log(res);
  };
  //======================================((Get Work API))======================================================//
  const GetWork = async () => {
    try {
      const res = await getWorkasignment();
      setWork(res.data);
      //console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  //======================================((Get Work By Id API))=================================================//
  const GetWorkById = async (id) => {
    const res = await getWorkasignmentById(id);
    //console.log(res);
  };
  //======================================((Update Work API))====================================================//
  const UpdateWork = async (id, data) => {
    const res = await updateWorkasignment(id, data);
    //console.log(res);
  };
  //======================================((Delete Work API))====================================================//
  const DeleteWork = async (id) => {
    const res = await deleteWorkasignment(id);
    //console.log(res);
  };

  //==================================((create JobAsigment API))=================================================//

  const CreateJob = async (data) => {
    const res = await createJobasignment(data);
    //console.log(res);
  };

  //==================================((Get JobAsigment API))====================================================//

  const GetJob = async () => {
    try {
      const res = await getJobasignment();
      setJob(res.data);
      //console.log(res.data);
    } catch (error) {
      //console.log(error);
    }
  };
 


  //==================================((Get JobAsigment By Id API))==============================================//

   const GetJobById = async (id) => {
    try {
      const res = await getJobasignmentById(id);
      //console.log(res);
    } catch (error) {
      //console.log(error);
    }
    
   }


  //==================================((Update JobAsigment API))=================================================//

  const UpdateJob = async (id, data) => {
    try {
      const res = await updateJobasignment(id, data);
      //console.log(res);
    } catch (error) {
      //console.log(error);
    }
  }




  //==================================((Delete JobAsigment API))====================================================//

  const DeleteJob = async (id) => {
    try {
      const res = await deleteJobasignment(id);
      //console.log(res);
    } catch (error) {
      //console.log(error);
    }
  }

  return (
    <WorkContext.Provider
      value={{
        CreateWork,        
        GetWork,
        GetWorkById,
        UpdateWork,
        DeleteWork,
        CreateJob,
        GetJob,
        GetJobById,
        UpdateJob,
        DeleteJob,
        Work,
        Job
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};
