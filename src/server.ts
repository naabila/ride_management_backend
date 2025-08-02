import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");

    server = app.listen(envVars.PORT, () => {
      console.log(`🚀 Server is listening on port ${envVars.PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("❗ Unhandled rejection detected ... shutting down");
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("❗ Uncaught exception detected ... shutting down");
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

// Handle SIGINT
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received ... shutting down gracefully");
  if (server) {
    server.close(() => process.exit(0));
  } else {
    process.exit(0);
  }
});
