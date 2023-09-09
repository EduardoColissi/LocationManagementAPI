import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import IProperty from "../../interfaces/propertyInterface";

export class EditPropertyController {
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

      const {
        description,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        country,
        zip_code,
        house,
        apartment,
        rooms,
        pet_friendly,
        bed_linen,
        towels,
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const property: IProperty | null = await prismaClient.property.update({
        where: {
          id: property_id,
          user_id: user_id,
        },
        data: <IProperty>{
          description,
          street,
          number,
          complement,
          neighborhood,
          city,
          state,
          country,
          zip_code,
          house,
          apartment,
          rooms,
          pet_friendly,
          bed_linen,
          towels,
          user_id: user_id,
        },
      });

      res.status(201).json({
        message: "Imóvel atualizado com sucesso!",
        property: property,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: [{ message: "Erro interno no servidor." }] });
    }
  }
}
