import type { Request, Response } from "express";
import { LoginRequest } from "../../types/authentication/auth.types.js";
import { loginService } from "../../services/authentication/auth.service.js";

// Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // TODO as a login request
        const loginData = req.body as LoginRequest;

        // Call service layer to handle business logic
        const result = await loginService(loginData);

        // Return response
        res.status(200).json(result);
    } catch (error) {
        console.error("Login error: ", error);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

// Configuration values should be stored in environment variables
// const CLIENT_ID = 5;
// const CLIENT_SECRET = "joySKkF8sldY0CTv3QvuIoCsKdKRpiZqEKJcfAsF";
// const AUTH_API_URL = "https://signin-api.prod.multiversity.click/oauth/token";
// const GRANT_TYPE = "password";

// export const authentication = () => {
//     console.log("AUTHENTICATION CALLED");

//     router.post(AUTH_API_URL, async (req: Request, res: Response): Promise<any> => {
//         console.log("Sono in router post");
//         try {
//             console.log("Sono in nel try");

//             const { username, password } = req.body as LoginRequest;

//             console.log("us e pass --> ", username, password);

//             // Validate required fields
//             if (!username || !password) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Username and password are required",
//                 });
//             }

//             // Prepare the payload for the authentication API
//             const payload = {
//                 client_id: CLIENT_ID,
//                 client_secret: CLIENT_SECRET,
//                 grant_type: GRANT_TYPE,
//                 scope: "*",
//                 username,
//                 password,
//             };

//             console.log("Payload --> ", payload);

//             // Call the external authentication API
//             const response = await fetch(AUTH_API_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();

//             console.log("DATA --> ", data);

//             // If the external API returns an error
//             if (!response.ok) {
//                 console.error("Authentication failed:", data);
//                 return res.status(response.status).json({
//                     success: false,
//                     message: data.error_description || "Authentication failed",
//                 });
//             }

//             // Return the authentication data to the client
//             return res.status(200).json(data);
//         } catch (error) {
//             console.error("Login error:", error);
//             return res.status(500).json({
//                 success: false,
//                 message: "Internal server error",
//             });
//         }
//     });
// };
