/**
 * Base error class for all application errors.
 * Extends the native Error class with additional properties.
 */
export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        // Check if error is operational or programming error.
        public isOperational: boolean = true,
        // Field for identifying specific code error types.
        public code?: string
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Client errors (4xx)
 */

// 400 - Bad Request.
export class BadRequestError extends AppError {
    constructor(message: string = "Bad request.", code?: string) {
        super(400, message, true, code);
    }
}

// 401 - Unauthorized.
export class AuthenticationError extends AppError {
    constructor(message: string = "Authentication failed.", code?: string) {
        super(401, message, true, code);
    }
}

// 403 - Forbidden.
export class ForbiddenError extends AppError {
    constructor(message: string = "Permission denied.", code?: string) {
        super(403, message, true, code);
    }
}

// 404 - Not Found.
export class NotFoundError extends AppError {
    constructor(message: string = "Resource not found.", code?: string) {
        super(404, message, true, code);
    }
}

// 409 - Conflict.
export class ConflictError extends AppError {
    constructor(message: string = "Resource conflict.", code?: string) {
        super(409, message, true, code);
    }
}

// 422 - Unprocessable Entity.
export class ValidationError extends AppError {
    constructor(
        message: string = "Validation failed.",
        public validationErrors?: Record<string, string>[],
        code?: string
    ) {
        super(422, message, true, code);
    }
}

// 429 - Too Many Requests.
export class RateLimitError extends AppError {
    constructor(message: string = "Too many requests. Rate limit exceeded.", code?: string) {
        super(429, message, true, code);
    }
}

/**
 * Server errors (5xx)
 */

// 500 - Internal Server Error.
export class InternalError extends AppError {
    constructor(message: string = "Internal server error.", code?: string) {
        super(500, message, true, code);
    }
}

// 502 - Bad Gateway.
export class ExternalServiceError extends AppError {
    constructor(message: string = "External service error.", code?: string) {
        super(502, message, true, code);
    }
}

// 503 - Service Unavailable.
export class ServiceUnavailableError extends AppError {
    constructor(message: string = "Service temporarily unavailable.", code?: string) {
        super(503, message, true, code);
    }
}

// 504 - Gateway Timeout.
export class TimeoutError extends AppError {
    constructor(message: string = "Request timeout.", code?: string) {
        super(504, message, true, code);
    }
}

/**
 * Domain-specific errors
 * This errors represent domain-specific errors and are then mapped to HTTP errors in the controller.
 */

// Authentication error.
export class InvalidCredentialsError extends AuthenticationError {
    constructor(message: string = "Invalid username or password.") {
        super(message, "INVALID_CREDENTIALS");
    }
}

// Token expired error.
export class ExpiredTokenError extends AuthenticationError {
    constructor(message: string = "Token has expired.") {
        super(message, "TOKEN_EXPIRED");
    }
}

// Connection error to the database.
export class DatabaseError extends InternalError {
    constructor(message: string = "Database operation failed.") {
        super(message, "DATABASE_ERROR");
    }
}

// External API request error.
export class ApiRequestError extends ExternalServiceError {
    constructor(
        message: string = "API request failed.",
        public apiName?: string,
        public originalError?: any
    ) {
        super(message, "API_REQUEST_ERROR");
        this.apiName = apiName;
        this.originalError = originalError;
    }
}
