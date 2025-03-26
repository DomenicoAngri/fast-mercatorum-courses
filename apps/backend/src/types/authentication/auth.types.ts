/**
 * Login request data structure.
 */
export interface LoginRequestInterface {
    username: string;
    password: string;
}

/**
 * Login response from auth API if successful.
 */
export interface LoginResponseOkInterface {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    success?: boolean;
    message?: string;
    error_description?: string;
}

/**
 * Login response from auth API if unsuccessful.
 */
export interface LoginResponseErrorInterface {
    error_description?: string;
}
