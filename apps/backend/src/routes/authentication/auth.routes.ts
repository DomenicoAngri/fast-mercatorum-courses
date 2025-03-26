import express from "express";
import { loginController } from "../../controllers/authentication/auth.controller.js";
import { validateCredentialsMiddleware } from "../../middleware/authentication/auth.middleware.js";

const router = express.Router();

// Auth routes
router.post("/login", validateCredentialsMiddleware, loginController);
// router.post("/logout", logout);
// router.post("/refresh-token", refreshToken);

export default router;
