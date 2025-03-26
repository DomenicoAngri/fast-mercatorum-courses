import type { Request, Response } from "express";
import { LoginRequestInterface } from "../../types/authentication/auth.types.js";
import { loginService } from "../../services/authentication/auth.service.js";

// Login controller
export const loginController = async (req: Request, res: Response): Promise<void> => {
    try {
        const loginData = req.body as LoginRequestInterface;

        // Call service layer to handle business logic.
        const result = await loginService(loginData);

        // Return response.
        res.status(200).json(result);
    } catch (error) {
        console.error("Login error: ", error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};
