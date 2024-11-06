import UserJobAssigment from "../models/userjobassigment.model.js";

//=====================================((CREATE JOB ASIGNMENT))==============================================//

export const post_userJobAssignment = async (req, res) => {
    const { USER,ASSIGMENTS, DATE } = req.body;
    console.log(req.body);
    const newUserJobAsingment = new UserJobAssigment({
      USER,ASSIGMENTS,DATE  
    });
    const UserSaved = await newUserJobAsingment.save();
    return res.json(UserSaved);
  }
  
  //=====================================((GET JOB ASIGNMENT))==============================================//
  export const get_userJobAssignment = async (req, res) => {
    const job = await UserJobAssigment.find({});
      return res.json(job);
  }
  
  //=====================================((UPDATE JOB ASIGNMENT))==============================================//
  export const update_userJobAssignment = async (req, res) => {
    const job = await UserJobAssigment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json(["Job not found"]);
    return res.json(job);
  }