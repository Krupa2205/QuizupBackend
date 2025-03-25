const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const progressRoutes = require("./routes/progressRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Mount progress routes
app.use("/api/progress", progressRoutes);

// Mount quiz routes
app.use("/api", quizRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));