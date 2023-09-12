import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetAllPeriods {
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

      const user_id = req.user.id;

      const periods = await prismaClient.period.findMany({
        where: {
          user_id: user_id,
        },
      });

      res.status(periods.length > 0 ? 200 : 204).json({
        message:
          periods.length > 0
            ? `${periods.length} períodos encontrados.`
            : "Nenhum período encontrado.",
        periods,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
