import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { GlobalData, UserData } from "../controllers/global.controller.js";

const routes = Router();

//=======================================================================//
//                            Get Graph Routes                           //
//=======================================================================//
routes.get("/global", authRequired,  GlobalData);


routes.get("/userdata/:id", authRequired, UserData);


export default routes;