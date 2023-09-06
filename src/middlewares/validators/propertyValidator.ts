import { body } from "express-validator";

export const propertyValidator = [
  body("street")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Logradouro é obrigatório!"),
  body("number").isNumeric().withMessage("Número é obrigatório!"),
  body("neighborhood")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Bairro é obrigatório!"),
  body("city")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Cidade é obrigatória!"),
  body("state")
    .isString()
    .isLength({ min: 1 })
    .withMessage("Estado é obrigatório!"),
  body("country")
    .isString()
    .isLength({ min: 1 })
    .withMessage("País é obrigatório!"),
  body("zip_code")
    .isString()
    .isLength({ min: 1 })
    .withMessage("CEP é obrigatório!"),
];
