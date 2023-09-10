import { Router } from "express";

import auth from "./middlewares/auth";

import { propertyValidator } from "./middlewares/validators/propertyValidator";
import { userValidator } from "./middlewares/validators/userValidator";

import { CreateProperty } from "./controllers/property/CreateProperty";
import { DeleteProperty } from "./controllers/property/DeleteProperty";
import { EditProperty } from "./controllers/property/EditProperty";
import { GetAllProperties } from "./controllers/property/GetAllProperties";
import { GetByIdProperty } from "./controllers/property/GetByIdProperty";
import { LoginController } from "./controllers/user/LoginController";
import { SignupController } from "./controllers/user/SignupController";

const signup = new SignupController();
const login = new LoginController();
const createProperty = new CreateProperty();
const deleteProperty = new DeleteProperty();
const getAllProperties = new GetAllProperties();
const getByIdProperty = new GetByIdProperty();
const editProperty = new EditProperty();

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
