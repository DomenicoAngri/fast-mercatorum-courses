import fetch from "node-fetch";
import { LoginRequest, LoginResponseOk, LoginResponseError } from "../../types/authentication/auth.types.js";

/**
 * Service for handling login logic.
 */
export const loginService = async (loginData: LoginRequest): Promise<LoginResponseOk> => {
    // Prepare the payload for the authentication API.
    const payload = {
        client_id: 5,
        client_secret: "joySKkF8sldY0CTv3QvuIoCsKdKRpiZqEKJcfAsF",
        grant_type: "password",
        scope: "*",
        username: loginData.username,
        password: loginData.password,
    };

    console.log("PAYLOAD --> ", payload);

    // Call the external authentication API.
    const response = await fetch("https://signin-api.prod.multiversity.click/oauth/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
    });

    console.log("RESPONSE --> ", response);

    const data = await response.json();

    // If the external API returns an error.
    if (!response.ok) {
        const dataError: LoginResponseError = data ? data : { error_description: "Authentication failed." };

        console.error("Authentication failed: ", dataError);
        throw new Error(dataError.error_description || "Authentication failed! Check your credentials and try again.");
    }

    return data as LoginResponseOk;
};
