import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { checkAuthentication, checkAuthorization } from "../middleware/authMiddleware";

const adminRoutes = Router();

adminRoutes.post('/dishes/create', checkAuthentication, checkAuthorization('Admin'), AdminController.createNewDish)
adminRoutes.get('/dishes/:id', checkAuthentication, checkAuthorization('Admin'), AdminController.findDishById)
adminRoutes.get('/dishes', checkAuthentication, checkAuthorization('Admin'), AdminController.findAllDishes)
adminRoutes.put('/dishes/:id', checkAuthentication, checkAuthorization('Admin'), AdminController.updateDish)
adminRoutes.delete('/dishes/:id', checkAuthentication, checkAuthorization('Admin'), AdminController.deleteDish)

export default adminRoutes;