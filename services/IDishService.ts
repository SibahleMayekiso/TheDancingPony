import { Dish } from "../models/Dish";

export interface IDishService {
    findByPk(id: number): Promise<Dish | null>
}