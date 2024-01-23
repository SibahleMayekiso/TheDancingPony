import { Request, Response } from "express";
import { DishService } from "../services/DishService";

/**
 * Controller class for handling customer-related operations.
 *
 * @export
 * @class CustomerController
 */
export class CustomerController {
    private _dishService: DishService;

    /**
     * Creates an instance of CustomerController.
     *
     * @param {DishService} dishService - The dish service used for interacting with dishes.
     * @memberof CustomerController
     */
    constructor(dishService: DishService) {
        this._dishService = dishService;
    }

    /**
     * Searches for dishes based on the provided query.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof CustomerController
     */
    async searchDishes(req: Request, res: Response) {
        const query = req.params.query;

        const dishes = await this._dishService.searchDishes(query);
        if (!dishes) {
            res.status(404).json({ message: 'No Dishes found' });
        }

        res.json({ dishes });
    }

    /**
     * Finds a dish by its ID.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof CustomerController
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
     * Rates a dish by its ID.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof CustomerController
     */
    async rateDishById(req: Request, res: Response) {
        const { id } = req.params;
        const { userId, rating } = req.body;

        const [userRating, isRatingCreated] = await this._dishService.rateDishById(userId, Number(id), rating);
        if (!userRating) {
            return res.status(404).json({ message: 'Dish not found' });
        }

        isRatingCreated ?
            res.json({ message: 'Rating created successfully', userRating }) :
            res.json({ message: 'Rating updated successfully', userRating });
    }
}