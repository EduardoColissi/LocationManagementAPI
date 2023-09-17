import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { validationResult } from "express-validator";
import ILocation from "../../interfaces/locationInterface";
import IPrice from "../../interfaces/priceInterface";

export class CreateLocation {
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

      const {
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

      const location = await prismaClient.location.create({
        data: <ILocation>{
          start_date,
          end_date,
          price_per_day,
          descount,
          additional_cost,
          observations,
          total,
          property_id,
          user_id,
        },
      });

      if (prices.length > 0) {
        const pricesData = prices.map((price: IPrice) => {
          return {
            location_id: location.id,
            period_id: price.period_id,
            price: price.price,
            user_id: user_id,
          };
        });

        const pricesCreated = await prismaClient.price.createMany({
          data: pricesData,
        });

        res.status(201).json({
          message: "Locação criada com sucesso!",
          location: { location, prices: pricesCreated },
        });
      } else {
        res.status(201).json({
          message: "Locação criada com sucesso!",
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
