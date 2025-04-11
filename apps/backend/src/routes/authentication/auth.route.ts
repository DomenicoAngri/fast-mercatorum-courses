import express from "express";
import { loginController } from "@controllers/authentication/index.js";
import { validateCredentialsMiddleware } from "@middleware/authentication/index.js";

const router = express.Router();

// Auth routes
router.post("/login", validateCredentialsMiddleware, loginController);
// router.post("/refresh-token", refreshToken);

export default router;
