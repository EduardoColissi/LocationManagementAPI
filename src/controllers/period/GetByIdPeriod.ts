import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetByIdPeriod {
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

      const period = await prismaClient.period.findUnique({
        where: {
          id: period_id,
          user_id: user_id,
        },
      });

      res.status(period != null ? 200 : 204).json({
        message:
          period != null
            ? `Período encontrado com sucesso!`
            : "Período não encontrado.",
        period: period,
      });
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
