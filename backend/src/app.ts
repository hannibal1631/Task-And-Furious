import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

// CORS configuration
app.use(
  cors({
    origin: "",
    credentials: true,
  }),
);

// middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes
import userRouter from "./routes/user.routes";

// routes declaration
app.use("/api/v1/user", userRouter);

export { app };
