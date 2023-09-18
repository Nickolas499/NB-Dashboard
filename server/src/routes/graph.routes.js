import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getGraphData } from "../controllers/graph.controller.js";

const routes = Router();

//=============================================================================//
//                        Get Graph Routes                             //
//=============================================================================//
routes.get("/", authRequired, getGraphData);

export default routes;