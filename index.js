const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");

dotenv.config();

sequelize
  .authenticate()
  .then(() => console.log("MySQL Connected"))
  .catch((error) => {
    console.error("MySQL connection failed:", error);
    process.exit(1);
  });
const app = express();
const allowedOrigins = [
  "https://movie-test-frontend.vercel.app", // Deployed frontend
  "http://localhost:3000", // Local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(cors());
app.use(bodyParser.json());

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
