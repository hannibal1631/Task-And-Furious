import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 20 * 1000, // 20sec
  max: 2,
  message: {
    success: false,
    message: "Too many attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
