import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeletePropertyController {
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

      const { id } = req.params;

      const deletedProperty = await prismaClient.property.delete({
        where: {
          id: Number(id),
          user_id: user_id,
        },
      });

      res
        .status(200)
        .json({
          message: `Imóvel ID ${deletedProperty.id} deletado com sucesso!`,
        });
    } catch (error) {
      res
        .status(500)
        .json({ error: [{ message: "Erro interno de servidor. " }] });
    }
  }
}