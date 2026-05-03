import developmentLogger from "./developmentLogger";
import productionLogger from "./productionLogger";

const env = process.env.NODE_ENV || "development";

const logger = env === "production" ? productionLogger() : developmentLogger();

export default logger;
