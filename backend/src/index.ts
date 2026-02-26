import { Request, Response } from "express";
import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("Happy Coding!");
});

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is running on port: http://localhost:${PORT}`);
    }),
  )
  .catch((err) => console.log("Mongo db connection failed !!", err));
