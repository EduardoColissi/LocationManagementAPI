import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetByIdLocation {
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
      const location_id = Number(req.params.id);

      const location = await prismaClient.location.findUnique({
        where: {
          id: location_id,
          user_id: user_id,
        },
        include: {
          prices: {
            include: {
              period: true,
            },
          },
        },
      });

      res.status(location != null ? 200 : 204).json({
        message:
          location != null
            ? `Locação encontrada com sucesso!`
            : "Locação não encontrada.",
        location: location,
      });
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
