import { Router } from "express";
import { CustomerController } from "../controllers/CustomerController";
import { checkAuthentication, checkAuthorization } from "../middleware/authMiddleware";

const customerRoutes = Router();

customerRoutes.get('/dishes/search/:query', checkAuthentication, checkAuthorization('Customer'), CustomerController.searchDishes);
customerRoutes.get('/dishes/:id', checkAuthentication, checkAuthorization('Customer'), CustomerController.findDishById);
customerRoutes.post('/dishes/:id/rate', checkAuthentication, checkAuthorization('Customer'), CustomerController.rateDishById);

export default customerRoutes;