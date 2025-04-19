import { LoginRequestInterface, LoginResponseInterface, RequestNewTokenInterface } from "@app-types/authentication/index.js";
import { createApiClient } from "@utils/index.js";

// Create a pre-configured API client for authentication API
const apiClient = createApiClient({
    baseUrl: "https://signin-api.prod.multiversity.click",
    apiName: "Authentication API",
});

/**
 * Service for handling login logic.
 */
export const loginService = async (loginData: LoginRequestInterface): Promise<LoginResponseInterface> => {
    // Prepare the payload for the authentication API.
    const payload = {
        client_id: 5,
        client_secret: "joySKkF8sldY0CTv3QvuIoCsKdKRpiZqEKJcfAsF",
        grant_type: "password",
        scope: "*",
        username: loginData.username,
        password: loginData.password,
    };

    return await apiClient.post<LoginResponseInterface>("/oauth/token", payload);
};

/**
 * Service for handling refresh token logic.
 */
export const requestNewTokenService = async (loginData: RequestNewTokenInterface): Promise<LoginResponseInterface> => {
    // Prepare the payload for the refresh token API.
    const payload = {
        client_id: 5,
        client_secret: "joySKkF8sldY0CTv3QvuIoCsKdKRpiZqEKJcfAsF",
        grant_type: "refresh_token",
        scope: "*",
        refresh_token: loginData.refresh_token,
    };

    return await apiClient.post<LoginResponseInterface>("/oauth/token", payload);
};
