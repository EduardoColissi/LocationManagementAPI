import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator/src/validation-result";
import ILocation from "../../interfaces/locationInterface";
import IPrice from "../../interfaces/priceInterface";

export class EditLocation {
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

      const {
        renter,
        start_date,
        end_date,
        price_per_day,
        descount,
        additional_cost,
        observations,
        total,
        property_id,
        prices,
      } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const location: ILocation | null = await prismaClient.location.update({
        where: {
          id: location_id,
          user_id: user_id,
        },
        data: <ILocation>{
          renter,
          start_date,
          end_date,
          price_per_day,
          descount: descount,
          additional_cost: additional_cost,
          observations,
          total,
          property_id: property_id,
          user_id,
        },
      });

      if (prices.length > 0) {
        const pricesUpdated = prices.map(async (price: IPrice) => {
          await prismaClient.price.update({
            where: {
              id: price.id,
              location_id: location_id,
            },
            data: <IPrice>{
              location_id: location_id,
              period_id: price.period_id,
              price: price.price,
              user_id: user_id,
            },
          });
        });

        res.status(201).json({
          message: "Locação atualizada com sucesso!",
          location: location,
        });
      } else {
        res.status(201).json({
          message: "Locação atualizada com sucesso!",
          location: location,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        errors: [{ message: "Erro interno no servidor." }],
      });
    }
  }
}
