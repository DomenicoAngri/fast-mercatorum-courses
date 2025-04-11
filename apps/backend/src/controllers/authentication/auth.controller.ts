import type { NextFunction, Request, Response } from "express";
import { LoginRequestInterface } from "@app-types/authentication/index.js";
import { loginService } from "@services/authentication/index.js";

// Login controller
export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const loginData = req.body as LoginRequestInterface;

        // Call service layer to handle business logic.
        const result = await loginService(loginData);

        // Return response.
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
