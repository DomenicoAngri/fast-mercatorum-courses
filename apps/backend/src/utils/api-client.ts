import fetch, { RequestInit, Response } from "node-fetch";
import { ApiClientOptions } from "./api-client.types.js";

import {
    AppError,
    BadRequestError,
    AuthenticationError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    ValidationError,
    RateLimitError,
    InternalError,
    ExternalServiceError,
    ServiceUnavailableError,
    TimeoutError,
    ApiRequestError,
    InvalidCredentialsError,
    ExpiredTokenError,
    DatabaseError,
} from "./errors.js";

/**
 * ApiClient utility to handle API requests with consistent error handling.
 */
export class ApiClient {
    private baseUrl: string;
    private timeout: number;
    private defaultHeaders: Record<string, string>;
    private apiName: string;

    /**
     * Creates a new ApiClient instance.
     */
    constructor(options: ApiClientOptions) {
        this.baseUrl = options.baseUrl || "";
        this.timeout = options.timeout || 15000;
        this.defaultHeaders = options.defaultHeaders || {
            "Content-Type": "application/json",
        };
        this.apiName = options.apiName;
    }

    /**
     * Perform a GET request.
     */
    async get<T>(url: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: "GET" });
    }

    /**
     * Perform a POST request.
     */
    async post<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    /**
     * Perform a PUT request.
     */
    async put<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    /**
     * Perform a PATCH request.
     */
    async patch<T>(url: string, body: any, options: RequestInit = {}): Promise<T> {
        return this.request<T>(url, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(body),
        });
    }

    /**
     * Perform a DELETE request.
     */
    async delete<T>(url: string, options: RequestInit = {}): Promise<T> {
        return this.request<T>(url, { ...options, method: "DELETE" });
    }

    /**
     * Send a request to the API with consistent error handling.
     */
    async request<T>(url: string, options: RequestInit = {}): Promise<T> {
        const fullUrl = this.baseUrl ? `${this.baseUrl}${url}` : url;

        // Merge default headers with provided headers.
        const headers = {
            ...this.defaultHeaders,
            ...(options.headers || {}),
        };

        try {
            // Create abort controller for timeout. If response takes longer than timeout, abort the request.
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            // Send request.
            const response = (await fetch(fullUrl, {
                ...options,
                headers,
                signal: controller.signal,
            })) as Response;

            // Clear timeout, if request completes before timeout.
            clearTimeout(timeoutId);

            // Parse response.
            const data = await this.parseResponse(response);

            // Check if response is ok, otherwise throw error.
            if (!response.ok) {
                throw this.handleErrorResponse(response.status, data);
            }

            return data as T;
        } catch (error) {
            // Handle aborted requests (timeouts issue).
            if (error instanceof Error && error.name === "AbortError") {
                throw new TimeoutError(`Request to ${this.apiName} timed out after ${this.timeout}ms.`);
            }

            // Rethrow custom errors with AppError class.
            if (error instanceof AppError) {
                throw error;
            }

            // Throw error for network or other issues.
            console.error(`Error in ${this.apiName} request:`, error);
            throw new ExternalServiceError(`Unable to connect to ${this.apiName}.`, "API_CONNECTION_ERROR");
        }
    }

    /**
     * Helper to parse JSON response with error handling.
     */
    private async parseResponse(response: Response): Promise<any> {
        try {
            // Try to parse as JSON.
            return await response.json();
        } catch (error) {
            // If not JSON, return text content.
            const text = await response.text();
            return { message: text || "No response body." };
        }
    }

    /**
     * Map HTTP status codes to appropriate error types.
     */
    private handleErrorResponse(status: number, data: any): AppError {
        const message = data.error_description || data.message || `${this.apiName} request failed.`;
        const errorCode = data.error || data.code;

        /**
         *  Check for specific error codes that might indicate specific domain errors.
         */

        // For invalid credentials. We can edit error codes in the future if change.
        if (errorCode === "invalid_credentials" || errorCode === "invalid_grant" || message.includes("invalid credentials")) {
            return new InvalidCredentialsError(message);
        }

        // For expired tokens.
        if (errorCode === "token_expired" || message.includes("expired")) {
            return new ExpiredTokenError(message);
        }

        // Map HTTP status codes to appropriate error classes
        switch (status) {
            case 400:
                return new BadRequestError(message, errorCode);
            case 401:
                // Default to generic authentication error if no specific code was matched.
                return new AuthenticationError(message, errorCode);
            case 403:
                return new ForbiddenError(message, errorCode);
            case 404:
                return new NotFoundError(message, errorCode);
            case 409:
                return new ConflictError(message, errorCode);
            case 422:
                return new ValidationError(message, data.errors, errorCode);
            case 429:
                return new RateLimitError(message, errorCode);
            case 500:
                // Check if it's a database error with 500 status code.
                if (errorCode === "database_error" || message.toLowerCase().includes("database")) {
                    return new DatabaseError(message);
                }
                return new InternalError(message, errorCode);
            case 502:
                return new ApiRequestError(message, this.apiName, data);
            case 503:
                return new ServiceUnavailableError(message, errorCode);
            case 504:
                return new TimeoutError(message, errorCode);
            default:
                // For any other server error (5xx).
                if (status >= 500) {
                    return new InternalError(`${this.apiName} server error: ${message}`, errorCode);
                }

                // For any other client error (4xx).
                return new AppError(status, `${this.apiName} error: ${message}`, true, errorCode);
        }
    }
}

/**
 * Create a preconfigured API client for a specific API
 */
export const createApiClient = (options: ApiClientOptions): ApiClient => {
    return new ApiClient(options);
};
