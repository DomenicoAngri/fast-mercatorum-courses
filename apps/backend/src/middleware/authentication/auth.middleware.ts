import { Request, Response, NextFunction } from "express";
import { LoginRequestInterface } from "@app-types/authentication/index.js";
import { containsSqlInjectionPatterns } from "./auth.middleware.utils.js";

/**
 * Middleware for validating login request.
 *
 * Performs the following checks:
 * - Username is not empty after trimming.
 * - Username is at least 3 characters.
 * - Username doesn't contain SQL injection patterns.
 * - Password is not empty.
 * - Password is at least 6 characters.
 */

export const validateCredentialsMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { username, password } = req.body as LoginRequestInterface;

        // === USERNAME VALIDATION ===

        // Check if username exists.
        if (username === undefined || username === null) {
            res.status(400).json({
                success: false,
                message: "Username is required.",
            });

            return;
        }

        // Check if username is empty after trimming.
        const trimmedUsername = username.toString().trim();

        if (trimmedUsername === "") {
            res.status(400).json({
                success: false,
                message: "Username cannot be empty.",
            });

            return;
        }

        // Check username length.
        if (trimmedUsername.length < 3) {
            res.status(400).json({
                success: false,
                message: "Username must be at least 3 characters long.",
            });

            return;
        }

        // Check for SQL injection patterns.
        if (containsSqlInjectionPatterns(trimmedUsername)) {
            res.status(400).json({
                success: false,
                message: "Username contains invalid characters or patterns.",
            });

            return;
        }

        // === PASSWORD VALIDATION ===

        // Check if password exists.
        if (password === undefined || password === null) {
            res.status(400).json({
                success: false,
                message: "Password is required.",
            });

            return;
        }

        // Check if password is a string and not empty.
        if (typeof password !== "string" || password.trim() === "") {
            res.status(400).json({
                success: false,
                message: "Password cannot be empty.",
            });

            return;
        }

        // Check password length.
        if (password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long.",
            });

            return;
        }

        // Add sanitized username to request for use in next middleware/controller.
        req.body.username = trimmedUsername.toLowerCase();

        // If all validations pass, proceed to next middleware.
        next();
    } catch (error) {
        console.error("Credential validation error: ", error);

        res.status(500).json({
            success: false,
            message: "An error occurred during credential validation.",
        });
    }
};
