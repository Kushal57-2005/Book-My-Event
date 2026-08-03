import express from "express";
import healthRoute from "./modules/health/route.js";
import authRoute from "./modules/auth/route.js";
import eventsRoute from "./modules/events/routes.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: env.ALLOWED_ORIGINS,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/health", healthRoute);
app.use("/api/v1", healthRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/events", eventsRoute);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    statusCode,
    message,
    success: false,
    errors: err.errors || [],
  });
});

const server = app.listen(env.PORT, () => {
  console.log(`Server is running on http://localhost:${env.PORT}`);
  connectDB();
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\n❌ ERROR: Port ${env.PORT} is already in use by another process!`,
    );
    console.error(
      `👉 Solution: Close the process using port ${env.PORT} or change PORT in your .env file.\n`,
    );
  } else {
    console.error("Server error:", err);
  }
});
