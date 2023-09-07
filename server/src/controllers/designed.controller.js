import Designed from "../models/design.model.js";

//==================================================================================//
//                       Get all Designed data                                        //
//==================================================================================//
export const getDesigned = async (req, res) => {
  //const scaneds = await Designed.find();
  const designed = await Designed.find({ USER: req.user.id });

  return res.json(designed);
};
//==================================================================================//
//                      create Designed data                                          //
//==================================================================================//
export const createDesigned = async (req, res) => {
  const {
    IBO_DESIGNED,
    CROWN_RESTORATION,
    CEMENTE_BRIDGE_RESTORATION,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_RESTORATION,
    IMPLANT_BRIDGE_RESTORATION,
    PRINTED_MODELS,
    DATE,
  } = req.body;
  console.log(req.body);
  const newDesigned = new Designed({
    IBO_DESIGNED,
    CROWN_RESTORATION,
    CEMENTE_BRIDGE_RESTORATION,
    FULL_ARCH_P,
    FULL_ARCH_F,
    IMPLANT_RESTORATION,
    IMPLANT_BRIDGE_RESTORATION,
    PRINTED_MODELS,
    DATE,
    USER: req.user.id,
  });
  const DesignedSaved = await newDesigned.save();
  return res.json(DesignedSaved);
};
//==================================================================================//
//                       Get Designed data by ID                                      //
//==================================================================================//
export const getDesignedByID = async (req, res) => {
  const designed = await Designed.findById(req.params.id);
  if (!designed) return res.status(404).json(["Designed not found"]);
  return res.json(designed);
};
//==================================================================================//
//                       Update Designed data by ID                                   //
//==================================================================================//
export const updateDesigned = async (req, res) => {
  const designed = await Designed.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!designed) return res.status(404).json(["Designed not found"]);
  return res.json(designed);
};
//==================================================================================//
//                       Delete Designed data by ID                                   //
//==================================================================================//
export const deleteDesigned = async (req, res) => {
  const designed = await Designed.findByIdAndDelete(req.params.id);
  if (!designed) return res.status(404).json(["Designed not found"]);
  return res.status(204).json();
};
