import Redesigned from "../models/redesign.model.js";

//==================================================================================//
//                       Get all Redesigned data                                        //
//==================================================================================//
export const getRedesigned = async (req, res) => {
  //const scaneds = await Redesigned.find();
  const redesigned = await Redesigned.find({ USER: req.user.id });

  return res.json(redesigned);
};
//==================================================================================//
//                      create Redesigned data                                          //
//==================================================================================//
export const createRedesigned = async (req, res) => {
  const {
    IBO_DESIGNED,
    CROWN_RESTORATION,
    CEMENTE_BRIDGE_RESTORATION,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_RESTORATION,
    IMPLANT_BRIDGE_RESTORATION,    
    DATE,
  } = req.body;
  console.log(req.body);
  const newRedesigned = new Redesigned({
    IBO_DESIGNED,
    CROWN_RESTORATION,
    CEMENTE_BRIDGE_RESTORATION,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_RESTORATION,
    IMPLANT_BRIDGE_RESTORATION,    
    DATE,
    USER: req.user.id,
  });
  const RedesignedSaved = await newRedesigned.save();
  return res.json(RedesignedSaved);
};
//==================================================================================//
//                       Get Redesigned data by ID                                      //
//==================================================================================//
export const getRedesignedByID = async (req, res) => {
  const redesigned = await Redesigned.findById(req.params.id);
  if (!redesigned) return res.status(404).json(["Redesigned not found"]);
  return res.json(redesigned);
};
//==================================================================================//
//                       Update Redesigned data by ID                                   //
//==================================================================================//
export const updateRedesigned = async (req, res) => {
  const redesigned = await Redesigned.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!redesigned) return res.status(404).json(["Redesigned not found"]);
  return res.json(redesigned);
};
//==================================================================================//
//                       Delete Redesigned data by ID                                   //
//==================================================================================//
export const deleteRedesigned = async (req, res) => {
  const redesigned = await Redesigned.findByIdAndDelete(req.params.id);
  if (!redesigned) return res.status(404).json(["Redesigned not found"]);
  return res.status(204).json();
};
