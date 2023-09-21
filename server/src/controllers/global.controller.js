import Scaned from "../models/scaned.model.js";
import Designed from "../models/design.model.js";
import Redesigned from "../models/redesign.model.js";



export const GlobalData = async (req, res) => {
  try {
    const GlobalProData = await Scaned.find({});    
    if (!GlobalProData || GlobalProData.length === 0) {
      return res.status(404).json(["Global not found"]);
    }
    // console.log(GlobalProData);
    // console.log(processData(GlobalProData));
    return res.json(processData(GlobalProData));
  } catch (error) {
    return res.status(500).json(["Internal server error"]);
  }

}





function processData(data) {
  const result = {};
  
  data.forEach(item => {
    const { DATE, LS3, ZEISS, SHAPE, COPY_MILL, FULL_ARCH } = item;
    
    if (!result[DATE]) {
      result[DATE] = {
        _id: DATE,
        LS3: 0,
        ZEISS: 0,
        SHAPE: 0,
        COPY_MILL: 0,
        FULL_ARCH: 0
      };
    }
    
    result[DATE].LS3 += LS3;
    result[DATE].ZEISS += ZEISS;
    result[DATE].SHAPE += SHAPE;
    result[DATE].COPY_MILL += COPY_MILL;
    result[DATE].FULL_ARCH += FULL_ARCH;
  });
  
  return Object.values(result);
}