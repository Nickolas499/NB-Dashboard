import Registration from "../models/registration.model.js";
import moment from "moment";    

//==================================================================================//
//                Get all registrations data                                        //   
//==================================================================================//
export const getRegistrations = async (req, res) => {
    //const registrations = await Registration.find();
    const registrations = await Registration.find({USER: req.user.id});

    const formattedRegistrations = registrations.map(r => {
    return {
      ID: r._id,
      DATE: moment(r.DATE).format('MM/DD/YYYY'),  
      IBO: r.IBO,
      ABUT: r.ABUT,
      FULL_ARCH_P: r.FULL_ARCH_P, 
      FULL_ARCH_F: r.FULL_ARCH_F
    }
  });

  return res.json(formattedRegistrations);
};
//==================================================================================//
//               create registrations data                                          //   
//==================================================================================//
export const createRegistration = async (req, res) => {
    const { IBO, ABUT, FULL_ARCH_P, FULL_ARCH_F, DATE } = req.body;
    const newRegistration = new Registration({ IBO, ABUT, FULL_ARCH_P, FULL_ARCH_F, DATE, USER: req.user.id });
    const registrationSaved = await newRegistration.save();
    return res.json(registrationSaved);
};
//==================================================================================//
//                Get registrations data by ID                                      //   
//==================================================================================//
export const getRegistration = async (req, res) => {
    const registration = await Registration.findById(req.params.id);
    if(!registration) return res.status(404).json(["Registration not found"]);
    return res.json(registration);
};
//==================================================================================//
//                Update registrations data by ID                                   //   
//==================================================================================//
export const updateRegistration = async (req, res) => {
    const registration = await Registration.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!registration) return res.status(404).json(["Registration not found"]);
    return res.json(registration);
};
//==================================================================================//
//                Delete registrations data by ID                                   //   
//==================================================================================//
export const deleteRegistration = async (req, res) => {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if(!registration) return res.status(404).json(["Registration not found"]);
    return res.status(204).json();
};