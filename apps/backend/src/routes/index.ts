import express from "express";
import authRoutes from "./authentication/auth.route.js";
import studentRoutes from "./student/student.route.js";
import { validateAuth } from "@/middleware/index.js";

const router = express.Router();

// Mount the different route modules.
router.use("/auth", authRoutes);
router.use("/student", validateAuth, studentRoutes);

export default router;
