import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import IPeriod from "../../interfaces/periodInterface";

export class EditPeriod {
  async handle(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          errors: [
            { message: "Não autorizado! Por favor, realize seu login." },
          ],
        });
        return;
      }

      const user_id = Number(req.user.id);
      const period_id = Number(req.params.id);

      const { start_date, end_date, description, one_day } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const data = {
        start_date: start_date,
        end_date: one_day ? start_date : end_date,
        description: description,
        user_id: user_id,
      };

      const period: IPeriod | null = await prismaClient.period.update({
        where: {
          id: period_id,
          user_id: user_id,
        },
        data: <IPeriod>data,
      });

      res
        .status(201)
        .json({ message: "Período atualizado com sucesso!", period: period });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errors: [{ message: "Erro interno no servidor." }],
      });
    }
  }
}
