import express from "express";
import { loginController, refreshNewTokenController } from "@controllers/authentication/index.js";
import { validateCredentialsMiddleware } from "@middleware/authentication/index.js";

const router = express.Router();

// Auth routes.
router.post("/login", validateCredentialsMiddleware, loginController);
router.post("/refresh-token", refreshNewTokenController);

export default router;
