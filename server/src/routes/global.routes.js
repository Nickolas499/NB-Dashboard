import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { GlobalData } from "../controllers/global.controller.js";

const routes = Router();

//=============================================================================//
//                        Get Graph Routes                             //
//=============================================================================//
routes.get("/global", authRequired,  GlobalData);

// routes.get("/userprodata", authRequired, getUserData);

export default routes;