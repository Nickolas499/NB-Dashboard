import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getGlobalData, getUserData } from "../controllers/graph.controller.js";

const routes = Router();

//=============================================================================//
//                        Get Graph Routes                             //
//=============================================================================//
routes.get("/globaprodata", authRequired, getGlobalData);

routes.get("/userprodata", authRequired, getUserData);

export default routes;