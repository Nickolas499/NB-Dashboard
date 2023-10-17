import workasingment from "../models/workasignment.model.js";
//=====================================((CREATE WORK CONTROLLER))==============================================//
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

//=====================================((GET WORK CONTROLLER))==============================================//

export const getWork = async (req, res) => {
  const work = await workasingment.findOne({}).sort({ createdAt: -1 });
    return res.json(work);
  
}

export const updateWork = async (req, res) => {
  const work = await workasingment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!work) return res.status(404).json(["Work not found"]);
  return res.json(work);
}