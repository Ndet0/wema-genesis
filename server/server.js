import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import donationRoutes from "./routes/donations.js";
import contactRoutes from "./routes/contact.js";

// Load environment variables FIRST
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// --------------------
// Global Middleware
// --------------------
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use("/api/", limiter);

app.use(
  cors({
    origin: process.env.VITE_FRONTEND_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// --------------------
// Routes
// --------------------

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// Core API routes
app.use("/api/donations", donationRoutes);
app.use("/api/contact", contactRoutes);

// --------------------
// Server start
// --------------------
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Frontend origin: ${process.env.VITE_FRONTEND_ORIGIN}`);
});
