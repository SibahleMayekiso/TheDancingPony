import { Dish } from "../models/Dish";
import { Rating } from "../models/Rating";
import { IDishService } from "./IDishService";

/**
 * Service interface for handling customer-related operations.
 *
 * @export
 * @interface ICustomerService
 * @extends {IDishService}
 */
export interface ICustomerService extends IDishService {
    searchDishes(query: Object): Promise<Dish[] | null>;
    rateDishById(userId: number, dishId: number, rating: number): Promise<[Rating | null, boolean | null]>;
}