import Scaned from "../models/scaned.model.js";

import {graphPipeline} from "../pipeline/pipeline.js";

export const getGraphData = async (req, res) => {
   
    const graphicsScaned = await Scaned.aggregate(graphPipeline);
    return res.json(graphicsScaned);
}