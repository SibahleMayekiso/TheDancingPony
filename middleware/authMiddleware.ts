/// <reference path="../types/express/custom.d.ts" />
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../models/User";
import { JwtPayload } from "./jwt-payload";


export function checkAuthentication(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const secretKey: Secret = 'my-secret-key';

    const token = authHeader.split(' ')[1];

    try {
        req.userPayload = jwt.verify(token, secretKey) as JwtPayload;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
    }
}

export function checkAuthorization(role: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findByPk(req.userPayload.userId);
        if (user?.role !== role) {
            return res.status(403).json({ message: 'User does not have permission to perform this action' })
        }

        next();
    }
}