import { Dish } from "../models/Dish";

/**
 * Service interface for handling dish-related operations.
 *
 * @export
 * @interface IDishService
 */
export interface IDishService {
    findByPk(id: number): Promise<Dish | null>
}