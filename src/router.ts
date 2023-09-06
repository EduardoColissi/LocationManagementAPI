import { Router } from "express";

import auth from "./middlewares/auth";

import { userValidator } from "./middlewares/validators/userValidator";
import { propertyValidator } from "./middlewares/validators/propertyValidator";

import { SignupController } from "./controllers/user/SignupController";
import { LoginController } from "./controllers/user/LoginController";
import { CreatePropertyController } from "./controllers/property/CreatePropertyController";

const signup = new SignupController();
const login = new LoginController();
const createProperty = new CreatePropertyController();

const routes = Router();

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

routes.use(auth);

routes.post("/property", propertyValidator, createProperty.handle);

export default routes;
