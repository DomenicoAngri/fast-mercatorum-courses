import { LoginRequestInterface, LoginResponseInterface } from "../../types/authentication/auth.types.js";
import { createApiClient } from "../../utils/api-client.js";

// Create a pre-configured API client for authentication API
const authApiClient = createApiClient({
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

    return await authApiClient.post<LoginResponseInterface>("/oauth/token", payload);
};
