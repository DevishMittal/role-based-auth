const express = require("express");
const cors = require("cors"); // Import CORS
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
dbConnect();

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from this origin
  credentials: true, // Allow cookies (if needed)
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start the server
const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});