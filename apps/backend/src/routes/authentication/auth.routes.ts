import express from "express";
import { login } from "../../controllers/authentication/auth.controller.js";
import { validateCredentialsMiddleware, escapePasswordSpecialChars } from "../../middleware/authentication/auth.middleware.js";

const router = express.Router();

// Auth routes
router.post("/login", validateCredentialsMiddleware, login);
// router.post("/logout", logout);
// router.post("/refresh-token", refreshToken);

export default router;
