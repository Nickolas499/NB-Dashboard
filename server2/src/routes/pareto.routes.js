import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getParetos,
    createPareto,
    getPareto,
    updatePareto,
    deletePareto
} from "../controllers/pareto.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createParetoSchema } from "../schemas/production.schema.js";

const routes = Router();

//=====================[Get Scans Routes]============================//
routes.get("/pareto", authRequired,getParetos);

//=====================[Get Scan Routes by ID]=======================//
routes.get("/pareto/:id", authRequired, getPareto);

//=====================[Create Scan Routes]=========================//
routes.post("/pareto", authRequired, validateSchema(createParetoSchema), createPareto);

//===================[Delete Scan Routes]========================//
routes.delete("/pareto/:id", authRequired, deletePareto);

//=====================[Update Scan Routes]=========================//
routes.put("/pareto/:id", authRequired, updatePareto);

export default routes;