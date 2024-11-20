import Registration from "../models/registration.model.js";



//=============[Get all registrations data]================//

export const getRegistrations = async (req, res) => {
  //const registrations = await Registration.find();
  const registrations = await Registration.find({ USER: req.user.id }).sort({ createdAt: -1 });

  return res.json(registrations);
};

//=============[create registrations data ]================//
export const createRegistration = async (req, res) => {
  try {
    const { PHIS_IBO,DIGI_IBO, PHIS_ABUT, FULL_ARCH_PRO, FULL_ARCH_FINAL, DATE } = req.body;
  const newRegistration = new Registration({
    PHIS_IBO,
    DIGI_IBO,
    PHIS_ABUT,
    FULL_ARCH_PRO,
    FULL_ARCH_FINAL,
    DATE,
    USER: req.user.id,
  });
  const registrationSaved = await newRegistration.save();
  return res.json(registrationSaved);
  } catch (error) {
    return res.status(404).json(["Registration not found"]);
  }
};

//================[Get registrations data by ID]================//
export const getRegistration = async (req, res) => {
  try{
    const registration = await Registration.findById(req.params.id);
    if (!registration) return res.status(404).json(["Registration not found"]);
    return res.json(registration);
  }catch (error){
    return res.status(404).json(["Registration not found"]);

  }
};

//================[Update registrations data by ID]================//
export const updateRegistration = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
 try {
    const registration = await Registration.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
    
  );
  if (!registration) return res.status(404).json(["Update not found"]);
  return res.json(registration);
 } catch (error) {
  return res.status(404).json([`Update not found ${error}`]);
 }
};

//================[Delete registrations data by ID]================//
export const deleteRegistration = async (req, res) => {
  console.log(req.params.id);
  const registration = await Registration.findByIdAndDelete(req.params.id);
  if (!registration) return res.status(404).json(["Registration not found"]);
  return res.status(204).json();
};
