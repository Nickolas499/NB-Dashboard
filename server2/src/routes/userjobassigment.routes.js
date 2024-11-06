import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {post_userJobAssignment, get_userJobAssignment, update_userJobAssignment} from "../controllers/userjobassigment.controller.js";


const routes = Router();

routes.post("/userJobAssignment", authRequired, post_userJobAssignment);
routes.get("/userJobAssignment",authRequired, get_userJobAssignment);
routes.put("/userJobAssignment/:id", authRequired, update_userJobAssignment);

export default routes;