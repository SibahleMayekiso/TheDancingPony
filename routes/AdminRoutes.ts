import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { checkAuthentication, checkAuthorization } from "../middleware/authMiddleware";
import { DishService } from "../services/DishService";
import { Dish } from "../models/Dish";

const adminRoutes = Router();
const dishService = new DishService(Dish);
const adminController = new AdminController(dishService);

adminRoutes.post('/dishes/create', checkAuthentication, checkAuthorization('Admin'), adminController.createNewDish.bind(adminController))
adminRoutes.get('/dishes/:id', checkAuthentication, checkAuthorization('Admin'), adminController.findDishById.bind(adminController))
adminRoutes.get('/dishes', checkAuthentication, checkAuthorization('Admin'), adminController.findAllDishes.bind(adminController))
adminRoutes.put('/dishes/:id', checkAuthentication, checkAuthorization('Admin'), adminController.updateDish.bind(adminController))
adminRoutes.delete('/dishes/:id', checkAuthentication, checkAuthorization('Admin'), adminController.deleteDish.bind(adminController))

export default adminRoutes;