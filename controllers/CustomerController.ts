import { Request, Response } from "express";
import { Dish } from '../models/Dish';
import { Rating } from '../models/Rating';
import { Op } from "sequelize";

export class CustomerController {
    static async searchDishes(req: Request, res: Response) {
        const query = req.params.query;

        const dishes = await Dish.findAll({ where: { name: { [Op.iLike]: `%${query}%` } } });
        if (!dishes) {
            res.status(404).json({ message: 'No Dishes found' });
        }

        res.json({ dishes });
    }

    static async findDishById(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json({ dish });
    }

    static async rateDishById(req: Request, res: Response) {
        const { id } = req.params;
        const { userId, rating } = req.body;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        const [userRating, isRatingCreated] = await Rating.upsert(
            { userId, dishId: id, rating },
            { returning: true }
        );

        isRatingCreated ?
            res.json({ message: 'Rating created successfully', userRating }) :
            res.json({ message: 'Rating updated successfully', userRating })
    }
}