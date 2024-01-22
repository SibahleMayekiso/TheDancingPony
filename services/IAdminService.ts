import { Dish } from "../models/Dish";
import { IDishService } from "./IDishService";

export interface IAdminService extends IDishService {
    createDish(name: string, description: string, price: number, image: string): Promise<Dish>;
    findAllDishes(): Promise<Dish[]>;
    updateDish(id: number, name: string, description: string, price: number, image: string): Promise<Dish | null>
    deleteDish(id: number): Promise<boolean>;
}