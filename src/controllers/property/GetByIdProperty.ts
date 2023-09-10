import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";

export class GetByIdProperty {
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

      const property = await prismaClient.property.findUnique({
        where: {
          id: property_id,
          user_id: user_id,
        },
        include: {
          user: true,
        },
      });

      res.status(property != null ? 200 : 204).json({
        message:
          property != null
            ? `Imóvel encontrado com sucesso!`
            : "Imóvel não encontrado.",
        property: property,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: [{ message: "Erro interno de servidor. " }] });
    }
  }
}
