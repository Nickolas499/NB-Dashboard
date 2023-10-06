import Scaned from "./models/scaned.model.js";
import Designed from "./models/design.model.js";
import Registration from "./models/registration.model.js";
import Redesigned from "./models/redesign.model.js";
import processData from './libs/processData.js';
import DailyProduction from "./models/dailyproduction.model.js";
import asignment from "./models/asignment.model.js";



export const data = async () => {
    const ScanedData = await Scaned.find({});
    const DesignedData = await Designed.find({});
    
    //console.log(processData(ScanedData, DesignedData));
}


export const databyid = async (id) => {
    const ScanedData = await Scaned.find({ USER: id });
    const DesignedData = await Designed.find({ USER: id });    
    // console.log(processData(ScanedData, DesignedData));
}

export const ProductivityData = async () => {
    const productivity = await Designed.aggregate([
        { $project: { DATE:1,  total: { $add: ["$IBO_DESIGNED", "$CROWN_REST", "$CEMENTE_BRIDGE_REST", "$FULL_ARCH_P", "$FULL_ARCH_F", "$IMPLANT_REST", "$IMPLANT_BRIDGE_REST", "$PRINTED_MODELS"] } } },
        { $sort: { DATE: 1 } },
        { $group: { _id: "$DATE", total: { $sum: "$total" } } },
        { $project: { _id: 0, DATE: "$_id", total: 1 } }
     ])
    // console.log(productivity);
}

export const CaseReceived = async () => {
    const cases = await Registration.aggregate([
            { $project: { DATE:1,  total: { $add: ["$IBO", "$ABUT", "$FULL_ARCH_P", "$FULL_ARCH_F"] } } },
            { $group: { _id: "$DATE", total: { $sum: "$total" } } },
            { $project: { _id: 0, DATE: "$_id", total: 1 } },
            { $sort: { DATE: 1 } }
    ])
    // console.log(cases);
}

export const RedesignedUnits = async () => {
    const cases = await Redesigned.aggregate([
        { $project: { DATE:1,  total: { $add: ["$IBO_DESIGNED", "$CROWN_REST", "$CEMENTE_BRIDGE_REST", "$FULL_ARCH_P", "$FULL_ARCH_F", "$IMPLANT_REST", "$IMPLANT_BRIDGE_REST"] } } },
        { $group: { _id: "$DATE", total: { $sum: "$total" } } },
        { $project: { _id: 0, DATE: "$_id", total: 1 } },
        { $sort: { DATE: 1 } }
     ])
    // console.log(cases);

}


export const DailyProd = async () => {
    
        
     console.log("Working...");
}



