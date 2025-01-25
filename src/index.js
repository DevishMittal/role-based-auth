require("dotenv").config(); // Load environment variables first
const express = require("express");
const cors = require("cors");
const pool = require("./config/dbConnect"); // MySQL connection pool
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Test MySQL connection on startup
pool.getConnection()
  .then((connection) => {
    console.log("Connected to MySQL database!");
    connection.release();
  })
  .catch((err) => {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  });

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});