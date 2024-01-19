import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export class UserController {
    static async register(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        const user = await User.create({ name, email, password, role: 'Customer' });

        const token = jwt.sign({ userId: user.id }, 'my-secret-key');

        res.json({ token });
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, 'my-secret-key');

        res.json({ token });
    }
}