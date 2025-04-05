import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import routes from "./routes/index.js";
import { notFoundHandler, errorHandler } from "./middleware/error/error.middleware.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API router gateway
app.use("/api", routes);

// TODO: Check if this is needed.
// Health check endpoint
// app.get("/health", (req, res) => {
//     res.status(200).json({ status: "ok" });
// });

// 404 middleware handler route not found - must be after all defined routes.
app.use(notFoundHandler);

// Global middleware error handler - must be the last middleware.
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
