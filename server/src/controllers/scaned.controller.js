import Scaned from "../models/scaned.model.js";

// //==================================================================================//
// //                       Get all Scaned data for graphics                           //
// //==================================================================================//
// export const getAllScanedData = async (req, res) => {
//   const AllScaned = await Scaned.find({});
//   return res.json(AllScaned);
// };

//==================================================================================//
//                       Get  Scaned data                                           //
//==================================================================================//
export const getScaned = async (req, res) => {
  const pipeline = [
    {
      "$lookup" : {
          "from" : "designs",
          "localField" : "USER",
          "foreignField" : "USER",
          "as" : "designs"
      }
  }, 
  {
      "$lookup" : {
          "from" : "redesigns",
          "localField" : "USER",
          "foreignField" : "USER",
          "as" : "redesigns"
      }
  }, 
  {
      "$project" : {
          "DATE" : 1,
          "IBO_S" : {
              "$sum" : [
                  "$LS3",
                  "$ZEISS",
                  "$COPY_MILL"
              ]
          },
          "IBO_D" : {
              "$arrayElemAt" : [
                  "$designs.IBO_DESIGNED",
                  0
              ]
          },
          "IBO_R" : {
              "$arrayElemAt" : [
                  "$redesigns.IBO_DESIGNED",
                  0
              ]
          }
      }
  }
  ]
  const graphicsScaned = await Scaned.aggregate(pipeline);
  const Allscaned = await Scaned.find({}).sort({ createdAt: -1 });
  const scaned = await Scaned.find({ USER: req.user.id }).sort({ createdAt: -1 });

  // console.log(graphicsScaned);

  return res.json({ Allscaned, scaned, graphicsScaned });
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
