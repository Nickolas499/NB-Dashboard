import Scaned from "../models/scaned.model.js";


//==================================================================================//
//                       Get all Scaned data                                        //
//==================================================================================//
export const getScaned = async (req, res) => {
  //const scaneds = await Scaned.find();
  const scaned = await Scaned.find({ USER: req.user.id });

  return res.json(scaned);
};
//==================================================================================//
//                      create Scaned data                                          //
//==================================================================================//
export const createScaned = async (req, res) => {
  const { LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH, DATE } = req.body;
  console.log(req.body);
  const newScaned = new Scaned({
    LS3,
    ZEISS,
    SHAPE,
    COPY_MILL,
    FULL_ARCH,
    DATE,
    USER: req.user.id,
  });
  const ScanedSaved = await newScaned.save();
  return res.json(ScanedSaved);
};
//==================================================================================//
//                       Get Scaned data by ID                                      //
//==================================================================================//
export const getScanedByID = async (req, res) => {
  const scaned = await Scaned.findById(req.params.id);
  if (!scaned) return res.status(404).json(["Scaned not found"]);
  return res.json(scaned);
};
//==================================================================================//
//                       Update Scaned data by ID                                   //
//==================================================================================//
export const updateScaned = async (req, res) => {
  const scaned = await Scaned.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!scaned) return res.status(404).json(["Scaned not found"]);
  return res.json(scaned);
};
//==================================================================================//
//                       Delete Scaned data by ID                                   //
//==================================================================================//
export const deleteScaned = async (req, res) => {
  const scaned = await Scaned.findByIdAndDelete(req.params.id);
  if (!scaned) return res.status(404).json(["Scaned not found"]);
  return res.status(204).json();
};
