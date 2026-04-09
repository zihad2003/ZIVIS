import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

console.log("Setting up CORS for origin:", process.env.FRONTEND_URL);
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes
import analysisRouter from "./routes/analysis.routes.js";
import authRouter from "./routes/auth.routes.js";

app.use("/api/v1/analysis", analysisRouter);
app.use("/api/v1/auth", authRouter);

export { app };
