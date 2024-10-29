import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verify,
  getUsers,
  deleteUser
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";



const routes = Router();

routes.get("/verify", verify);

routes.post("/register", validateSchema(registerSchema), register);

routes.delete("/deleteuser/:id",authRequired, deleteUser)

routes.post("/login", validateSchema(loginSchema), login);

routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);

routes.get("/users", authRequired, getUsers);

export default routes;
