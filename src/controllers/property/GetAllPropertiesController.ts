import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetAllPropertiesController {
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

      const properties = await prismaClient.property.findMany({
        where: {
          user_id: user_id,
        },
      });

      res
        .status(200)
        .json({
          message: `Encontramos um total de ${properties.length} imóveis.`,
          properties,
        });
    } catch (error) {
      res
        .status(500)
        .json({ error: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
