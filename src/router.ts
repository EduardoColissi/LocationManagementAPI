import { Router } from "express";

import auth from "./middlewares/auth";

import { userValidator } from "./middlewares/validators/userValidator";
import { propertyValidator } from "./middlewares/validators/propertyValidator";

import { SignupController } from "./controllers/user/SignupController";
import { LoginController } from "./controllers/user/LoginController";
import { CreatePropertyController } from "./controllers/property/CreatePropertyController";
import { DeletePropertyController } from "./controllers/property/DeletePropertyController";
import { GetAllPropertiesController } from "./controllers/property/GetAllPropertiesController";
import { GetByIdPropertyController } from "./controllers/property/GetByIdPropertyController";
import { EditPropertyController } from "./controllers/property/EditPropertyController";

const signup = new SignupController();
const login = new LoginController();
const createProperty = new CreatePropertyController();
const deleteProperty = new DeletePropertyController();
const getAllProperties = new GetAllPropertiesController();
const getByIdProperty = new GetByIdPropertyController();
const editProperty = new EditPropertyController();

const routes = Router();

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

routes.use(auth);

routes.post("/property", propertyValidator, createProperty.handle);
routes.delete("/property/:id", deleteProperty.handle);
routes.get("/properties", getAllProperties.handle);
routes.get("/property/:id", getByIdProperty.handle);
routes.put("/property/:id", propertyValidator, editProperty.handle);

export default routes;
