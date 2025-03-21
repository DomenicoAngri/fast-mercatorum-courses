// apps/backend/src/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import coursesRouter from "./routes/fastCourseRoute";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic routes
app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", message: "Server is running" });
});

// Course routes
app.use("/api/courses", coursesRouter);

// Custom error interface to include status code
interface AppError extends Error {
    statusCode?: number;
}

// Global error handler
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: "error",
        message: err.message || "An error occurred on the server",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
