import express from "express";
import routes from "./router";
import cors from "cors";
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT ? Number(process.env.PORT) : 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
