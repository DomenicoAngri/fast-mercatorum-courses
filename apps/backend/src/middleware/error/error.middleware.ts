import { Request, Response, NextFunction } from "express";
import { AppError } from "@utils/index.js";

/**
 * Global error handling middleware.
 * Catches all errors and provides consistent responses.
 */
export const errorHandler = (err: Error | AppError, req: Request, res: Response, next: NextFunction): void => {
    console.error(`Error: ${err.message}`, {
        url: req.originalUrl,
        method: req.method,
        stack: err.stack,
    });

    // If it's an instance of AppError, use its properties.
    if (err instanceof AppError) {
        // Build the error response.
        const errorResponse: any = {
            success: false,
            message: err.message,
        };

        // Add error code if present.
        if (err.code) {
            errorResponse.code = err.code;
        }

        // Add validation errors if present (for ValidationError).
        if ("validationErrors" in err && err.validationErrors) {
            errorResponse.errors = err.validationErrors;
        }

        // Send the response with the appropriate status code.
        res.status(err.statusCode).json(errorResponse);
        return;
    }

    // For generic (unhandled) errors, send a 500 error.
    res.status(500).json({
        success: false,
        message: "Internal server error.",
    });
};

/**
 * Middleware for handling routes not found (404).
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl}.`,
    });
};
