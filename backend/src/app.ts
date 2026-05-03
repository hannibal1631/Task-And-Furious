import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";

import { requestLogger } from "./middlewares/requestLogger";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app: Express = express();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Middleware
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Happy Coding!");
});

// routes
import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import taskRouter from "./routes/task.routes";
import workspaceRouter from "./routes/workspace.routes";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/workspace", workspaceRouter);

app.use(errorHandler);

export { app };
