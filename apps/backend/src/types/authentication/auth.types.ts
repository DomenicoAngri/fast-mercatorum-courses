/**
 * Login request data structure.
 */
export interface LoginRequest {
    username: string;
    password: string;
}

/**
 * Login response from auth API if successful.
 */
export interface LoginResponseOk {
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
export interface LoginResponseError {
    error_description?: string;
}
