const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

// Import routes
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const customerRoutes = require("./routes/customerRoutes");
const depositRoutes = require("./routes/depositRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const accountingRoutes = require("./routes/accountingRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const consultationRoutes = require("./routes/consultationRoutes");

const app = express();

// Middleware
app.use(cors());
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
app.use("/api/consultations", consultationRoutes);

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
