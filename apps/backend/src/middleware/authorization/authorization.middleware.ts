import { Request, Response, NextFunction } from "express";

/**
 * Middleware to check if authentication token is present.
 * Does not validate the token, just checks its presence.
 * Useful for routes that require authentication.
 */
export const validateAuth = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with 'Bearer '.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Authentication token is required.",
        });

        return;
    }

    // If 'Bearer ' exists, extract the token.
    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Invalid authentication token format.",
        });

        return;
    }

    // If token is present, proceed to the next middleware/controller.
    next();
};
