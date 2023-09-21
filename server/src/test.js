import Scaned from "./models/scaned.model.js";
import Designed from "./models/design.model.js";
import processData from './libs/processData.js';




export const data = async () => {
    const ScanedData = await Scaned.find({});
    const DesignedData = await Designed.find({});
    
    //console.log(processData(ScanedData, DesignedData));
}


export const databyid = async (id) => {
    const ScanedData = await Scaned.find({ USER: id });
    const DesignedData = await Designed.find({ USER: id });
    console.log(DesignedData);
    // console.log(processData(ScanedData, DesignedData));
}



 