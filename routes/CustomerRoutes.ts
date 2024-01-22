import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";
import { checkAuthentication, checkAuthorization } from "../middleware/authMiddleware";
import { DishService } from "../services/DishService";
import { Dish } from "../models/Dish";

const customerRoutes = Router();
const dishService = new DishService(Dish);
const customerController = new CustomerController(dishService);

customerRoutes.get('/dishes/search/:query', checkAuthentication, checkAuthorization('Customer'), customerController.searchDishes.bind(customerController));
customerRoutes.get('/dishes/:id', checkAuthentication, checkAuthorization('Customer'), customerController.findDishById.bind(customerController));
customerRoutes.post('/dishes/:id/rate', checkAuthentication, checkAuthorization('Customer'), customerController.rateDishById.bind(customerController));

export default customerRoutes;