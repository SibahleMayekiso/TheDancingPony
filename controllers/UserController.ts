import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

/**
 * Controller class for handling user-related operations.
 *
 * @export
 * @class UserController
 */
export class UserController {
    /**
     * Registers a new user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof UserController
     */
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

    /**
     * Logs in a user.
     *
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @memberof UserController
     */
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