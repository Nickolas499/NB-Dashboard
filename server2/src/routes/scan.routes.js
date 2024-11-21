import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getScans,
  createScan,
  getScan,
  updateScan,
  deleteScan,
} from "../controllers/scan.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createScanSchema } from "../schemas/production.schema.js";

const routes = Router();

//=====================[Get Scans Routes]============================//
routes.get("/scan", authRequired, getScans);

//=====================[Get Scan Routes by ID]=======================//
routes.get("/scan/:id", authRequired, getScan);

//=====================[Create Scan Routes]=========================//
routes.post(
  "/scan",
  authRequired,
  validateSchema(createScanSchema),
  createScan
);

//===================[Delete Scan Routes]========================//
routes.delete("/scan/:id", authRequired, deleteScan);

//=====================[Update Scan Routes]=========================//
routes.put("/scan/:id", authRequired, updateScan);

export default routes;