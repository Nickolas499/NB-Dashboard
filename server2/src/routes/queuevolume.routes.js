import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { post_queue_volume, get_queue_volume, update_queue_volume } from "../controllers/queuevolume.controller.js";


const routes = Router();

routes.post("/queuevolume", authRequired, post_queue_volume);
routes.get("/queuevolume",authRequired, get_queue_volume);
routes.put("/queuevolume/:id", authRequired, update_queue_volume);

export default routes;