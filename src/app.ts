import compression from "compression";
import cors from "cors";
import express, { Request, Response } from "express";
import { envVars } from "./config/env";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { router } from "./routes";

export const app = express();

// Middleware
app.use(cors()); // Enables Cross-Origin Resource Sharing
app.use(compression()); // Compresses response bodies for faster delivery
app.set("trust proxy", 1);
app.use(express.json()) // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))

app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Parcel Management System Backend"
    })
})


app.use(globalErrorHandler)

app.use(notFound)