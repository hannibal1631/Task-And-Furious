import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./db";
import logger from "./utils/logger/index";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() =>
    app.listen(PORT, () => {
      logger.info(`Server is running on port: http://localhost:${PORT}`);
    })
  )
  .catch((err) => logger.error("Mongo db connection failed !!", err));
