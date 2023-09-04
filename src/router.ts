import { Router } from "express";

import { userValidator } from "./middlewares/validators/userValidator";

import { SignupController } from "./controllers/user/SignupController";

const signup = new SignupController();

const routes = Router();

routes.post("/signup", userValidator, signup.handle);

export default routes;
