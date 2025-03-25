export interface LoginFormData {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
