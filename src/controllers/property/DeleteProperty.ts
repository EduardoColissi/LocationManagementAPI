import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class DeleteProperty {
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

      const deletedProperty = await prismaClient.property.delete({
        where: {
          id: property_id,
          user_id: user_id,
        },
      });

      res.status(200).json({
        message: `Imóvel ID ${deletedProperty.id} deletado com sucesso!`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
