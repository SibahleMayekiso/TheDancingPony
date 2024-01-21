import { Request, Response } from "express";
import { Dish } from '../models/Dish'

export class AdminController {
    static async createNewDish(req: Request, res: Response) {
        const { name, description, price, image } = req.body;

        const dish = await Dish.create({ name, description, price, image })

        res.json({ dish });
    }

    static async findDishById(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json({ dish });
    }

    static async findAllDishes(req: Request, res: Response) {
        const dishes = await Dish.findAll();
        if (!dishes) {
            res.status(404).json({ message: 'No Dishes found' });
        }

        res.json({ dishes });
    }

    static async updateDish(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        await dish.update({ name, description, price, image });

        res.json({ dish });
    }

    static async deleteDish(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await Dish.findByPk(id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        await dish.destroy();

        res.json({ message: 'Dishe deleted successfully' });
    }
}