import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createWork, getWork } from "../controllers/work.controller.js";





const routes = Router();

routes.post("/workasignment", authRequired, createWork);
routes.get("/workasignment", getWork);



export default routes;