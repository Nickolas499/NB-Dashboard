import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createWork, getWork, updateWork } from "../controllers/work.controller.js";
import { createJobAssignment, getJobAssignment, updateJobAssignment } from "../controllers/work.controller.js";

const routes = Router();

routes.post("/workasignment", authRequired, createWork);
routes.get("/workasignment",authRequired, getWork);
routes.put("/workasignment/:id", authRequired, updateWork);

routes.post("/jobasignment", authRequired, createJobAssignment);
routes.get("/jobasignment",authRequired, getJobAssignment);
routes.put("/jobasignment/:id", authRequired, updateJobAssignment);

export default routes;