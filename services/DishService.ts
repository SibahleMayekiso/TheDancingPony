import { Dish } from "../models/Dish";
import { Rating } from "../models/Rating";
import { IAdminService } from "./IAdminService";
import { ICustomerService } from "./ICustomerService";
import { Op } from "sequelize";

export class DishService implements IAdminService, ICustomerService {
    private _dishModel: typeof Dish;

    constructor(dishModel: typeof Dish) {
        this._dishModel = dishModel;
    }

    async createDish(name: string, description: string, price: number, image: string): Promise<Dish> {
        return this._dishModel.create({ name, description, price, image });
    }

    async findAllDishes(): Promise<Dish[]> {
        return this._dishModel.findAll();
    }

    async updateDish(id: number, name: string, description: string, price: number, image: string): Promise<Dish | null> {
        const dish = await this.findByPk(id);
        if (dish) {
            await dish.update({ name, description, price, image });
            return dish;
        }

        return null;
    }


    async deleteDish(id: number): Promise<boolean> {
        const dish = await this.findByPk(id);
        if (dish) {
            await dish.destroy();
            return true;
        }

        return false;
    }


    async findByPk(id: number): Promise<Dish | null> {
        return this._dishModel.findByPk(id);
    }

    async searchDishes(query: Object): Promise<Dish[] | null> {
        return this._dishModel.findAll({ where: { name: { [Op.iLike]: `%${query}%` } } });
    }

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