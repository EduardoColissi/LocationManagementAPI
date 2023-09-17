import { body } from "express-validator";

export const priceValidator = [
  body("price").isNumeric().withMessage("Preço é obrigatório!"),
];
