/**
 * Login request data structure.
 */
export interface LoginRequestInterface {
    username: string;
    password: string;
}

/**
 * Refresh token request data structure.
 */
export interface RequestNewTokenInterface {
    refresh_token: string;
}

/**
 * Login response from auth API if successful.
 */
export interface LoginResponseInterface {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}
