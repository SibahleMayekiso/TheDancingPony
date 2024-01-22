import { Request, Response } from "express";
import { DishService } from "../services/DishService";

export class AdminController {
    private _dishService: DishService;

    constructor(dishService: DishService) {
        this._dishService = dishService;
    }

    async createNewDish(req: Request, res: Response) {
        const { name, description, price, image } = req.body;

        const dish = await this._dishService.createDish(name, description, price, image);

        res.json({ dish });
    }

    async findDishById(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await this._dishService.findByPk(Number(id));
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json({ dish });
    }

    async findAllDishes(req: Request, res: Response) {
        const dishes = await this._dishService.findAllDishes();
        if (!dishes) {
            res.status(404).json({ message: 'No Dishes found' });
        }

        res.json({ dishes });
    }

    async updateDish(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        const dish = await this._dishService.updateDish(Number(id), name, description, price, image);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json({ dish });
    }

    async deleteDish(req: Request, res: Response) {
        const { id } = req.params;

        const isDeleted = await this._dishService.deleteDish(Number(id));
        if (!isDeleted) {
            return res.status(404).json({ message: 'Could not delete Dish' });
        }

        res.json({ message: 'Dish deleted successfully' });
    }
}