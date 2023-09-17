import { Router } from "express";

import auth from "./middlewares/auth";

import { propertyValidator } from "./middlewares/validators/propertyValidator";
import { userValidator } from "./middlewares/validators/userValidator";
import { periodValidator } from "./middlewares/validators/periodValidator";

import { CreateProperty } from "./controllers/property/CreateProperty";
import { DeleteProperty } from "./controllers/property/DeleteProperty";
import { EditProperty } from "./controllers/property/EditProperty";
import { GetAllProperties } from "./controllers/property/GetAllProperties";
import { GetByIdProperty } from "./controllers/property/GetByIdProperty";
import { LoginController } from "./controllers/user/LoginController";
import { SignupController } from "./controllers/user/SignupController";
import { CreatePeriod } from "./controllers/period/CreatePeriod";
import { EditPeriod } from "./controllers/period/EditPeriod";
import { GetAllPeriods } from "./controllers/period/GetAllPeriods";
import { GetByIdPeriod } from "./controllers/period/GetByIdPeriod";
import { DeletePeriod } from "./controllers/period/DeletePeriod";
import { CreateLocation } from "./controllers/location/CreateLocation";

const signup = new SignupController();
const login = new LoginController();
const createProperty = new CreateProperty();
const deleteProperty = new DeleteProperty();
const getAllProperties = new GetAllProperties();
const getByIdProperty = new GetByIdProperty();
const editProperty = new EditProperty();
const createPeriod = new CreatePeriod();
const editPeriod = new EditPeriod();
const getAllPeriods = new GetAllPeriods();
const getByIdPeriod = new GetByIdPeriod();
const deletePeriod = new DeletePeriod();
const createLocation = new CreateLocation();

const routes = Router();

routes.post("/signup", userValidator, signup.handle);
routes.post("/login", login.handle);

routes.use(auth);

routes.post("/property", propertyValidator, createProperty.handle);
routes.put("/property/:id", propertyValidator, editProperty.handle);
routes.delete("/property/:id", deleteProperty.handle);
routes.get("/properties", getAllProperties.handle);
routes.get("/property/:id", getByIdProperty.handle);

routes.post("/period", periodValidator, createPeriod.handle);
routes.put("/period/:id", periodValidator, editPeriod.handle);
routes.delete("/period/:id", deletePeriod.handle);
routes.get("/periods", getAllPeriods.handle);
routes.get("/period/:id", getByIdPeriod.handle);

routes.post("/location", createLocation.handle);

export default routes;
