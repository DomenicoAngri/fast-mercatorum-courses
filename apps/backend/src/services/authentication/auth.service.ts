import fetch from "node-fetch";
import { LoginRequestInterface, LoginResponseOkInterface, LoginResponseErrorInterface } from "../../types/authentication/auth.types.js";

import { createApiClient } from "../../utils/api-client.js";

// Create a pre-configured API client for authentication API
const authApiClient = createApiClient({
    baseUrl: "https://signin-api.prod.multiversity.click",
    apiName: "Authentication API",
});

// TODO - Sistemare la risposta della login
// TODO - Sistemare tutto il flusso da service fino ad index
// TODO - Capire se usare Login Response personale ok o error.
// TODO - Sistemare il logout

/**
 * Service for handling login logic.
 */
export const loginService = async (loginData: LoginRequestInterface): Promise<LoginResponseOkInterface> => {
    // Prepare the payload for the authentication API.
    const payload = {
        client_id: 5,
        client_secret: "joySKkF8sldY0CTv3QvuIoCsKdKRpiZqEKJcfAsF",
        grant_type: "password",
        scope: "*",
        username: loginData.username,
        password: loginData.password,
    };

    // Call the external authentication API.
    const response = await fetch("https://signin-api.prod.multiversity.click/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
    });

    const data = await response.json();

    // If the external API returns an error.
    if (!response.ok) {
        const dataError: LoginResponseErrorInterface = data ? data : { error_description: "Authentication failed." };

        console.error("Authentication failed: ", dataError);
        throw new Error(dataError.error_description || "Authentication failed! Check your credentials and try again.");
    }

    return data as LoginResponseOkInterface;
};
