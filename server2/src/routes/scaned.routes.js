import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  // getAllScanedData,
  getScaned,
  createScaned,
  getScanedByID,
  updateScaned,
  deleteScaned,
} from "../controllers/scaned.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createScanedSchema } from "../schemas/Zod.schema.js";


const routes = Router();

//=============================================================================//
//                        create scaned Routes                                 //
//=============================================================================//
routes.post("/scaned",authRequired,validateSchema(createScanedSchema), createScaned);
//=============================================================================//
//                        Get All scaned Data                             //
//=============================================================================//
// routes.get("/scaneds", authRequired, getAllScanedData);
//=============================================================================//
//                        Get scaned Routes                             //
//=============================================================================//
routes.get("/scaned", authRequired, getScaned);
//=============================================================================//
//                      Get scaned Routes by ID                          //
//=============================================================================//
routes.get("/scaned/:id", authRequired, getScanedByID);
//=============================================================================//
//                           Delete scaned Routes                        //
//=============================================================================//
routes.delete("/scaned/:id", authRequired, deleteScaned);
//=============================================================================//
//                          Update scaned Routes                         //
//=============================================================================//
routes.put("/scaned/:id", authRequired, updateScaned);

export default routes;
