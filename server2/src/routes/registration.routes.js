import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getRegistrations,
  createRegistration,
  getRegistration,
  updateRegistration,
  deleteRegistration,
} from "../controllers/registration.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createRegistrationSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        Get Registrations Routes                             //
//=============================================================================//
routes.get("/registration", authRequired, getRegistrations);
//=============================================================================//
//                      Get Registration Routes by ID                          //
//=============================================================================//
routes.get("/registration/:id", authRequired, getRegistration);
//=============================================================================//
//                        create Registration Routes                           //
//=============================================================================//
routes.post(
  "/registration",
  authRequired,
  validateSchema(createRegistrationSchema),
  createRegistration
);
//=============================================================================//
//                           Delete Registration Routes                        //
//=============================================================================//
routes.delete("/registration/:id", authRequired, deleteRegistration);
//=============================================================================//
//                          Update Registration Routes                         //
//=============================================================================//
routes.put("/registration/:id", authRequired, updateRegistration);

export default routes;
