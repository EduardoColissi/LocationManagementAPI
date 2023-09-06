import { User } from "@prisma/client";
import "express";
import IUser from "../interfaces/userInterface";

declare module "expfress" {
  export interface Request {
    user?: Partial<IUser>;
  }
}
