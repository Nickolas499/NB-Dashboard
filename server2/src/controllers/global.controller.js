import Scaned from "../models/scaned.model.js";
import Designed from "../models/design.model.js";
import processData from "../libs/processData.js";


//============================((GLOBAL DATA))=================================================//
// returns all data  from scaned and designed data                                            //
//============================================================================================//
export const GlobalData = async (req, res) => {
  try {
    const ScanedData = await Scaned.find({});
    const DesignedData = await Designed.find({});
    if (!ScanedData || !DesignedData) {
      return res.status(404).json(["Data not found"]);
    }

    return res.json(processData(ScanedData, DesignedData));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }
};


//============================((USER DATA))===================================================//
// returns all data for each user  from scaned and designed data                              //
//============================================================================================//
export const UserData = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const ScanedData = await Scaned.find({ USER: id });
    const DesignedData = await Designed.find({ USER: id });
    if (!ScanedData || !DesignedData) {
      return res.status(404).json(["Data not found"]);
    }
    return res.json(processData(ScanedData, DesignedData));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }
};


//============================((PRODUCTIVITY DATA))===========================================//
// returns the  sum of designed data                                                          //
//============================================================================================//


export const ProductivityData = async (req, res) => {
  try {
    
    const productivity = await Designed.aggregate([
      { $group: {
          _id: '$DATE',
          total: { $sum: '$IBO_DESIGNED' + '$CROWN_REST' + '$CEMENTE_BRIDGE_REST' + '$FULL_ARCH_P' + '$FULL_ARCH_F' + '$IMPLANT_REST' + '$IMPLANT_BRIDGE_REST' + '$PRINTED_MODELS' }
      }}
    ])
    if (!productivity) {
      return res.status(404).json(["Data not found"]);
    }
    return res.json(processData(productivity));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }
}
