import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { GlobalData, UserData, ProductivityData } from "../controllers/global.controller.js";

const routes = Router();

//=======================================================================//
//                            Get Graph Routes                           //
//=======================================================================//
routes.get("/global", authRequired,  GlobalData);


routes.get("/userdata/:id", authRequired, UserData);


routes.get("/productivity", authRequired, ProductivityData);
export default routes;