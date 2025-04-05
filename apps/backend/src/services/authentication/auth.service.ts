import { LoginRequestInterface, LoginResponseInterface } from "../../types/authentication/auth.types.js";

import { createApiClient } from "../../utils/api-client.js";

// Create a pre-configured API client for authentication API
const authApiClient = createApiClient({
    baseUrl: "https://signin-api.prod.multiversity.click",
    apiName: "Authentication API",
});

// TODO - Aggiungere login request anche al FE? aggiustare i campi di request e di response nel FE.
// TODO - Sistemare tutto il flusso da service fino ad index, vedere se c'è qualcosa che non va o mi sono perso qualcosa.
// TODO - Sistemare il logout
// TODO - quando seleziono da autocompile il campo, mi da una brutta grafica.
// TODO - modificare la login response con campi che non servono da cancellare.
// TODO - Controllare i todo.
// TODO - Vedere se mettere i console.log solo in development sul FE.

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
