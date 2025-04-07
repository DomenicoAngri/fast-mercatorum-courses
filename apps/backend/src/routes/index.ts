import express from "express";
import authRoutes from "./authentication/auth.routes.js";
// import courseRoutes from "./course.routes.js";

const router = express.Router();

// Mount the different route modules.
router.use("/auth", authRoutes);
// router.use("/course", courseRoutes);

export default router;
