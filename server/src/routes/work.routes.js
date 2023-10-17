import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createWork, getWork, updateWork } from "../controllers/work.controller.js";


const routes = Router();

routes.post("/workasignment", authRequired, createWork);
routes.get("/workasignment",authRequired, getWork);
routes.put("/workasignment/:id", authRequired, updateWork);


export default routes;