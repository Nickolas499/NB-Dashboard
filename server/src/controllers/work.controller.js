import workasingment from "../models/workasignment.model.js";


export const createWork = async (req, res) => {
    const { LS3, ZEISS, SHAPE, DIGI_ABUT, PHIS_ABUT, FULL_ARCH, DATE } = req.body;
    console.log(req.body);
    const newWork = new workasingment({
      LS3,
      ZEISS,
      SHAPE,
      DIGI_ABUT,
      PHIS_ABUT,
      FULL_ARCH,
      DATE,      
    });
    const WorkSaved = await newWork.save();
    return res.json(WorkSaved);
  };