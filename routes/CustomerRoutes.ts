import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";

const customerRoutes = Router();

customerRoutes.get('/dishes/search/:query', CustomerController.searchDishes);
customerRoutes.get('/dishes/:id', CustomerController.findDishById);
customerRoutes.post('/dishes/:id/rate', CustomerController.rateDishById);

export default customerRoutes;