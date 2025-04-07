/**
 * Login request data structure.
 */
export interface LoginRequestInterface {
    username: string;
    password: string;
}

/**
 * Login response from auth API with successful and error fields.
 */
export interface LoginResponseInterface {
    // Successful login response fields.
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    token_type?: string;

    // Error response fields.
    success?: boolean;
    statusCode?: number;
    message?: string;
    isOperational?: boolean;
    code?: string;
}
