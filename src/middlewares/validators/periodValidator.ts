import { body } from "express-validator";

export const periodValidator = [
  body("start_date").isString().withMessage("Data de início é obrigatória!"),
  body("end_date").isString().withMessage("Data de término é obrigatória!"),
  body("description")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Descrição é obrigatória!"),
];
