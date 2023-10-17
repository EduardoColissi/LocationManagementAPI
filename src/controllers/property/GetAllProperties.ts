import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetAllProperties {
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
      const { searchDescription } = req.query;

      const properties = await prismaClient.property.findMany({
        where: {
          user_id: user_id,
          AND: [
            {
              description: {
                contains: String(searchDescription),
              },
            },
          ],
        },
      });

      res.status(properties.length > 0 ? 200 : 204).json({
        message:
          properties.length > 0
            ? `${properties.length} imóveis encontrados.`
            : "Nenhum imóvel encontrado.",
        properties,
      });
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
