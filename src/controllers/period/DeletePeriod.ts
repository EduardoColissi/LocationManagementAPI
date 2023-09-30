import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeletePeriod {
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

      const deletedPeriod = await prismaClient.period.delete({
        where: {
          id: period_id,
          user_id: user_id,
        },
      });

      console.log(deletedPeriod);

      res.status(200).json({
        message: `Período ID ${deletedPeriod.id} deletado com sucesso!`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
