import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createWork } from "../controllers/production.controller.js";





const routes = Router();

routes.post("/workasignment", authRequired, createWork);



export default routes;