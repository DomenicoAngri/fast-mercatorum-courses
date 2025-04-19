import type { NextFunction, Request, Response } from "express";
import { LoginRequestInterface, RequestNewTokenInterface } from "@app-types/authentication/index.js";
import { loginService, requestNewTokenService } from "@services/authentication/index.js";

// Login controller.
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

// Refresh token controller.
export const refreshNewTokenController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshNewTokenData = req.body as RequestNewTokenInterface;

        // Call service layer to handle business logic.
        const result = await requestNewTokenService(refreshNewTokenData);

        // Return response.
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};
