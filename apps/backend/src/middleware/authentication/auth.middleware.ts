import { Request, Response, NextFunction } from "express";
import { LoginRequest } from "../../types/authentication/auth.types.js";
import { containsSqlInjectionPatterns } from "./auth.middleware.utils.js";

// TODO - Vedere se eliminare dopo, se non uso JWT, anche se eliminare libreria package.json.
// import jwt from "jsonwebtoken";
// import { JwtPayload, AuthRequest } from "./auth.middleware.types.js";

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
        const { username, password } = req.body as LoginRequest;

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

        // If all validations pass, proceed to next middleware
        next();
    } catch (error) {
        console.error("Credential validation error: ", error);

        res.status(500).json({
            success: false,
            message: "An error occurred during credential validation.",
        });
    }
};

export const escapePasswordSpecialChars = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const { password } = req.body as LoginRequest;

        req.body.password = password
            // Escape backslashes - Must be first!
            .replace(/\\/g, "\\\\")

            // Escape single quotes
            .replace(/'/g, "\\'")

            // Escape double quotes
            .replace(/"/g, '\\"')

            // Escape newlines
            .replace(/\n/g, "\\n")

            // Escape carriage returns
            .replace(/\r/g, "\\r")

            // Escape tabs
            .replace(/\t/g, "\\t")

            // Escape null characters;
            .replace(/\0/g, "\\0");

        next();
    } catch (error) {
        console.error("Escape password special characters error: ", error);

        res.status(500).json({
            success: false,
            message: "An error occurred during escape password special characters.",
        });
    }
};

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
//     try {
//         // Get authorization header
//         const authHeader = req.headers.authorization;
//         const username = authHeader.username;
//         const password = authHeader.password;

//         // Check if username is undefined/null
//         if (username === undefined || username === null) {
//             return {
//                 isValid: false,
//                 errorMessage: "Username is required",
//             };
//         }

//         // Check if username is empty or only whitespace
//         if (username.trim() === "") {
//             return {
//                 isValid: false,
//                 errorMessage: "Username cannot be empty",
//             };
//         }

//         // This is for JWT to be implemented after

//         // // Check if authorization header exists and has correct format
//         // if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         //     return res.status(401).json({
//         //         success: false,
//         //         message: "Authorization header must be in format 'Bearer token'.",
//         //     });
//         // }

//         // // Extract token
//         // const token = authHeader.split(" ")[1];

//         // if (!token) {
//         //     return res.status(401).json({
//         //         success: false,
//         //         message: "Authentication token missing.",
//         //     });
//         // }

//         // // Get JWT secret from environment variables
//         // const jwtSecret = process.env.JWT_SECRET;

//         // if (!jwtSecret) {
//         //     console.error("JWT_SECRET is not defined in environment variables");

//         //     return res.status(500).json({
//         //         success: false,
//         //         message: "Internal server error",
//         //     });
//         // }

//         // // Verify the token
//         // const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

//         // // Check token expiration (extra check even though jwt.verify already checks this)
//         // const currentTimestamp = Math.floor(Date.now() / 1000);
//         // if (decoded.exp < currentTimestamp) {
//         //     return res.status(401).json({
//         //         success: false,
//         //         message: "Token has expired",
//         //     });
//         // }

//         // // Store user data and token in request
//         // req.user = decoded;
//         // req.token = token;
//         // req.isAuthenticated = true;

//         // Continue to the next middleware or controller
//         next();
//     } catch (error) {
//         // Handle specific JWT errors
//         if (error instanceof jwt.JsonWebTokenError) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid token",
//             });
//         } else if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token has expired",
//             });
//         } else if (error instanceof jwt.NotBeforeError) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Token not yet valid",
//             });
//         }

//         // Log the error but don't expose details to client
//         console.error("Auth middleware error:", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error during authentication.",
//         });
//     }
// };
