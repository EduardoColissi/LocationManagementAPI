import { Response, Request } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import bcryptjs, { hash, compare } from "bcryptjs";

export class SignupController {
  async handle(req: Request, res: Response) {
    try {
      const { name, email, cellphone, password } = req.body;
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });

      if (userAlreadyExists) {
        res.status(422).json({
          errors: [
            {
              message: "Esse usuário já existe. Por favor, tente acessá-lo.",
            },
          ],
        });
      }

      const hashedPassword = await hash(password, 8);

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          cellphone,
          password: hashedPassword,
        },
      });

      res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", user: user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}
