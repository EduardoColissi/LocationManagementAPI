import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetAllLocations {
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
      const property_id = Number(req.params.id);

      const locations = await prismaClient.location.findMany({
        where: {
          user_id: user_id,
          property_id: property_id,
        },
        include: {
          prices: {
            include: {
              period: true,
            },
          },
        },
      });

      res.status(locations.length > 0 ? 200 : 204).json({
        message:
          locations.length > 0
            ? `${locations.length} locações encontradas.`
            : "Nenhuma locação encontrada.",
        locations,
      });
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
