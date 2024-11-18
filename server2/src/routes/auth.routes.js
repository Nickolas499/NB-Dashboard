import { Router } from "express";
import {
  Signup,
  login,
  logout,
  profile,
  verify,
  getUsers,
  deleteUser,
  updateUser
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {SignupSchema, loginSchema} from "../schemas/auth.schema.js";



const routes = Router();

routes.get("/verify", verify);

routes.post("/register", validateSchema(SignupSchema), Signup);

routes.delete("/deleteuser/:id",authRequired, deleteUser)

routes.put("/updateuser/:id",authRequired, updateUser)

routes.post("/login", validateSchema(loginSchema), login);

routes.post("/logout", logout);

routes.get("/profile", authRequired, profile);

routes.get("/users", authRequired, getUsers);

export default routes;
