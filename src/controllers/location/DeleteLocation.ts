import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteLocation {
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

      const deletedLocation = await prismaClient.location.delete({
        where: {
          id: location_id,
          user_id: user_id,
        },
      });

      res.status(200).json({
        message: `Locaçã0 ID ${deletedLocation.id} deletado com sucesso!`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ errors: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
