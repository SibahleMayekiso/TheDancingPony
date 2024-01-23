import { Request, Response } from "express";
import { DishService } from "../services/DishService";

/**
 * Controller class for handling admin-related operations.
 *
 * @export
 * @class AdminController
 */
export class AdminController {
    private _dishService: DishService;

    /**
     * Creates an instance of AdminController.
     *
     * @param {DishService} dishService - The dish service used for CRUD operations on dishes.
     * @memberof AdminController
     */
    constructor(dishService: DishService) {
        this._dishService = dishService;
    }

    /**
     * Creates a new dish.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof AdminController
     */
    async createNewDish(req: Request, res: Response) {
        const { name, description, price, image } = req.body;

        const dish = await this._dishService.createDish(name, description, price, image);

        res.json({ dish });
    }

    /**
     * Finds a dish by its ID.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof AdminController
     */
    async findDishById(req: Request, res: Response) {
        const { id } = req.params;

        const dish = await this._dishService.findByPk(Number(id));
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json({ dish });
    }

    /**
     * Finds all dishes.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof AdminController
     */
    async findAllDishes(req: Request, res: Response) {
        const dishes = await this._dishService.findAllDishes();
        if (!dishes) {
            res.status(404).json({ message: 'No Dishes found' });
        }

        res.json({ dishes });
    }

    /**
     * Updates a dish.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof AdminController
     */
    async updateDish(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, price, image } = req.body;

        const dish = await this._dishService.updateDish(Number(id), name, description, price, image);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        res.json({ dish });
    }

    /**
     * Deletes a dish.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof AdminController
     */
    async deleteDish(req: Request, res: Response) {
        const { id } = req.params;

        const isDeleted = await this._dishService.deleteDish(Number(id));
        if (!isDeleted) {
            return res.status(404).json({ message: 'Could not delete Dish' });
        }

        res.json({ message: 'Dish deleted successfully' });
    }
}