import { Router } from "express";

import { userValidator } from "./middlewares/validators/userValidator";

import { SignupController } from "./controllers/user/SignupController";
import { LoginController } from "./controllers/user/LoginController";

const signup = new SignupController();
const login = new LoginController();

const routes = Router();

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

export default routes;
