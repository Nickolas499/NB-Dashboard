import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getRedesigns,
  createRedesign,
  getRedesign,
  updateRedesign,
  deleteRedesign,
} from "../controllers/redesign.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRedesignSchema } from "../schemas/production.schema.js";

const routes = Router();

//=====================[Get Redesigns Routes]============================//
routes.get("/redesign", authRequired, getRedesigns);

//=====================[Get Redesign Routes by ID]=======================//
routes.get("/redesign/:id", authRequired, getRedesign);

//=====================[Create Redesign Routes]=========================//
routes.post(
  "/redesign",
  authRequired,
  validateSchema(createRedesignSchema),
  createRedesign
);

//===================[Delete Redesign Routes]========================//
routes.delete("/redesign/:id", authRequired, deleteRedesign);

//=====================[Update Redesign Routes]=========================//
routes.put("/redesign/:id", authRequired, updateRedesign);

export default routes;