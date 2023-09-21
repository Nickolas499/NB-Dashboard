import Scaned from "../models/scaned.model.js";
import {globalProductivity} from "../pipeline/globalProductivity.pipeline.js";
import {userProductivity} from "../pipeline/userProductivity.pipeline.js";


export const getGlobalData = async (req, res) => {   
    const GlobalProData = await Scaned.aggregate(globalProductivity);
    return res.json(GlobalProData);
}

// export const getUserData = async (req, res) => {
//     const UserProData = await Scaned.aggregate(userProductivity);
//     return res.json(UserProData);
// }


export const getUserData = async (req, res) => {     
    try {
        const userprodata = await Scaned.aggregate(userProductivity);
        if (!userprodata || userprodata.length === 0) {
            return res.status(404).json(["User not found"]);
        }        
        return res.json(userprodata);
    } catch (error) {
        return res.status(500).json(["Internal server error"]);
    }
};