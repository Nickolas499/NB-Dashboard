import Scaned from "../models/scaned.model.js";
import Designed from "../models/design.model.js";
import processData from "../libs/processData.js";

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
