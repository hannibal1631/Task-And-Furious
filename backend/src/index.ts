import { Request, Response } from "express";
import { app } from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Happy Coding!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
