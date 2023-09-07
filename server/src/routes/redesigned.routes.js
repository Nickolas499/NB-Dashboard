import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getRedesigned, createRedesigned, getRedesignedByID, updateRedesigned, deleteRedesigned } from "../controllers/redesigned.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRedesignedSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        create redesigned Routes                           //
//=============================================================================//
routes.post(
  "/redesigned",
  authRequired,
  validateSchema(createRedesignedSchema),
  createRedesigned
);
//=============================================================================//
//                        Get redesigned Routes                             //
//=============================================================================//
routes.get("/redesigned", authRequired, getRedesigned);
//=============================================================================//
//                      Get redesigned Routes by ID                          //
//=============================================================================//
routes.get("/redesigned/:id", authRequired, getRedesignedByID);

//=============================================================================//
//                           Delete redesigned Routes                        //
//=============================================================================//
routes.delete("/redesigned/:id", authRequired, deleteRedesigned);
//=============================================================================//
//                          Update redesigned Routes                         //
//=============================================================================//
routes.put("/redesigned/:id", authRequired, updateRedesigned);

export default routes;
