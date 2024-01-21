import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const adminRoutes = Router();

adminRoutes.post('/dishes/create', AdminController.createNewDish)
adminRoutes.get('/dishes/:id', AdminController.findDishById)
adminRoutes.get('/dishes/all', AdminController.findAllDishes)
adminRoutes.put('/dishes/:id', AdminController.updateDish)
adminRoutes.delete('/dishes/:id', AdminController.deleteDish)

export default adminRoutes;