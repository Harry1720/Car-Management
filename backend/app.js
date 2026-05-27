const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://127.0.0.1:5173",
].filter(Boolean);

// Import routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const customerRoutes = require("./routes/customerRoutes");
const depositRoutes = require("./routes/depositRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const accountingRoutes = require("./routes/accountingRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/deposits", depositRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/accounting", accountingRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Không tìm thấy route" });
});

// Error handler
app.use(errorHandler);

module.exports = app;
