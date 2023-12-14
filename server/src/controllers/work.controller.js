import workasingment from "../models/workasignment.model.js";
import jobasigment from "../models/Jobasigment.model.js";
//=====================================((CREATE WORK CONTROLLER))==============================================//
export const createWork = async (req, res) => {
    const { LS3, ZEISS, SHAPE,IBO_DESIGN, DIGI_ABUT, PHIS_ABUT, FULL_ARCH, DATE } = req.body;
    console.log(req.body);
    const newWork = new workasingment({
      LS3,
      ZEISS,
      SHAPE,
      IBO_DESIGN,
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
  const work = await workasingment.findOne({}, {
    _id: 0, 
    LS3: 1,
    ZEISS: 1,
    SHAPE: 1, 
    IBO_DESIGN: 1,
    DIGI_ABUT: 1,
    PHIS_ABUT: 1,
    FULL_ARCH: 1,
    DATE: 1
  }).sort({ createdAt: -1 });
    return res.json(work);
  
}

//=====================================((UPDATE WORK CONTROLLER))==============================================//
export const updateWork = async (req, res) => {
  const work = await workasingment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!work) return res.status(404).json(["Work not found"]);
  return res.json(work);
}


//=====================================((CREATE JOB ASIGNMENT))==============================================//

export const createJobAssignment = async (req, res) => {
  const { LS3, ZEISS, SHAPE, IBO_DESIGN, DIGI_ABUT, PHIS_ABUT, FULL_ARCH,DAY_OFF, DATE } = req.body;
  console.log(req.body);
  const newJobAsingment = new jobasigment({
    LS3,
    ZEISS,
    SHAPE,
    IBO_DESIGN,
    DIGI_ABUT,
    PHIS_ABUT,
    FULL_ARCH,
    DAY_OFF,
    DATE      
  });
  const WorkSaved = await newJobAsingment.save();
  return res.json(WorkSaved);
}

//=====================================((GET JOB ASIGNMENT))==============================================//
export const getJobAssignment = async (req, res) => {
  const job = await jobasigment.findOne({}, {
    _id: 0, 
    LS3: 1,
    ZEISS: 1,
    SHAPE: 1, 
    IBO_DESIGN: 1,
    DIGI_ABUT: 1,
    PHIS_ABUT: 1,
    FULL_ARCH: 1,    
    DATE: 1
  }).sort({createdAt: -1 });
    return res.json(job);
}

//=====================================((UPDATE JOB ASIGNMENT))==============================================//
export const updateJobAssignment = async (req, res) => {
  const job = await jobasigment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!job) return res.status(404).json(["Job not found"]);
  return res.json(job);
}