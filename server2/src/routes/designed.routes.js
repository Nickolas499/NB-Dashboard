import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getDesigned, createDesigned, getDesignedByID, updateDesigned, deleteDesigned } from "../controllers/designed.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createDesignedSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        create designed Routes                           //
//=============================================================================//
routes.post(
  "/designed",
  authRequired,
  validateSchema(createDesignedSchema),
  createDesigned
);
//=============================================================================//
//                        Get designed Routes                             //
//=============================================================================//
routes.get("/designed", authRequired, getDesigned);
//=============================================================================//
//                      Get designed Routes by ID                          //
//=============================================================================//
routes.get("/designed/:id", authRequired, getDesignedByID);

//=============================================================================//
//                           Delete designed Routes                        //
//=============================================================================//
routes.delete("/designed/:id", authRequired, deleteDesigned);
//=============================================================================//
//                          Update designed Routes                         //
//=============================================================================//
routes.put("/designed/:id", authRequired, updateDesigned);

export default routes;
