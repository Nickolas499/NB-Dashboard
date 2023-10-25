import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createWork, getWork, updateWork } from "../controllers/work.controller.js";
import { createJobAssignment} from "../controllers/work.controller.js";

const routes = Router();

routes.post("/workasignment", authRequired, createWork);
routes.get("/workasignment",authRequired, getWork);
routes.put("/workasignment/:id", authRequired, updateWork);

routes.post("/jobasignment", authRequired, createJobAssignment);
//routes.get("/jobasignment",authRequired, getWork);
//routes.put("/jobasignment/:id", authRequired, updateWork);

export default routes;