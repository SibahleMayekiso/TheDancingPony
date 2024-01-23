import { Dish } from "../models/Dish";
import { Rating } from "../models/Rating";
import { IAdminService } from "./IAdminService";
import { ICustomerService } from "./ICustomerService";
import { Op } from "sequelize";

/**
 * Service for handling dish-related operations.
 *
 * @export
 * @class DishService
 * @implements {IAdminService}
 * @implements {ICustomerService}
 */
export class DishService implements IAdminService, ICustomerService {
    private _dishModel: typeof Dish;

    constructor(dishModel: typeof Dish) {
        this._dishModel = dishModel;
    }

    /**
     * Creates a new dish.
     *
     * @param {string} name
     * @param {string} description
     * @param {number} price
     * @param {string} image
     * @return {*}  {Promise<Dish>}
     * @memberof DishService
     */
    async createDish(name: string, description: string, price: number, image: string): Promise<Dish> {
        return this._dishModel.create({ name, description, price, image });
    }

    /**
     * Finds all dishes.
     *
     * @return {*}  {Promise<Dish[]>}
     * @memberof DishService
     */
    async findAllDishes(): Promise<Dish[]> {
        return this._dishModel.findAll();
    }

    /**
     * Updates a dish.
     *
     * @param {number} id
     * @param {string} name
     * @param {string} description
     * @param {number} price
     * @param {string} image
     * @return {*}  {(Promise<Dish | null>)}
     * @memberof DishService
     */
    async updateDish(id: number, name: string, description: string, price: number, image: string): Promise<Dish | null> {
        const dish = await this.findByPk(id);
        if (dish) {
            await dish.update({ name, description, price, image });
            return dish;
        }

        return null;
    }

    /**
     * Deletes a dish.
     *
     * @param {number} id
     * @return {*}  {Promise<boolean>}
     * @memberof DishService
     */
    async deleteDish(id: number): Promise<boolean> {
        const dish = await this.findByPk(id);
        if (dish) {
            await dish.destroy();
            return true;
        }

        return false;
    }

    /**
     * Finds a dish by its primary key.
     *
     * @param {number} id
     * @return {*}  {(Promise<Dish | null>)}
     * @memberof DishService
     */
    async findByPk(id: number): Promise<Dish | null> {
        return this._dishModel.findByPk(id);
    }

    /**
     * Searches for dishes by name.
     *
     * @param {string} query
     * @return {*}  {(Promise<Dish[] | null>)}
     * @memberof DishService
     */
    async searchDishes(query: Object): Promise<Dish[] | null> {
        return this._dishModel.findAll({ where: { name: { [Op.iLike]: `%${query}%` } } });
    }

    /**
     * Rates a dish by its ID.
     *
     * @param {number} userId
     * @param {number} dishId
     * @param {number} rating
     * @return {*}  {Promise<[Rating | null, boolean | null]>}
     * @memberof DishService
     */
    async rateDishById(userId: number, dishId: number, rating: number): Promise<[Rating | null, boolean | null]> {
        const dish = await this.findByPk(dishId);
        if (!dish) {
            return [null, false];
        }

        return Rating.upsert(
            { userId, dishId, rating },
            { returning: true }
        );
    }
}