import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getDesigns,
  createDesign,
  getDesign,
  updateDesign,
  deleteDesign,
} from "../controllers/design.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createDesignSchema } from "../schemas/production.schema.js";

const routes = Router();

//=====================[Get Designs Routes]============================//
routes.get("/design", authRequired, getDesigns);

//=====================[Get Design Routes by ID]=======================//
routes.get("/design/:id", authRequired, getDesign);

//=====================[Create Design Routes]=========================//
routes.post(
  "/design",
  authRequired,
  validateSchema(createDesignSchema),
  createDesign
);

//===================[Delete Design Routes]========================//
routes.delete("/design/:id", authRequired, deleteDesign);

//=====================[Update Design Routes]=========================//
routes.put("/design/:id", authRequired, updateDesign);

export default routes;