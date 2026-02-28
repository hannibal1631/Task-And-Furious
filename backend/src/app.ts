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
import categoryRouter from "./routes/category.routes";
import taskRouter from "./routes/task.routes";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/tasks", taskRouter);

export { app };
