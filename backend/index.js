import cors from "cors";
import mysql from "mysql";
import express from "express";
import jwt from "jsonwebtoken";
import { setupAuthRoutes } from "./auth.js";
import { setupActivitiesRoutes } from "./activities.js";
import { setupMealsRoutes } from "./meals.js";
import { setupExercisesRoutes } from "./exercises.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const jwtSecret = "LIU"; // Use environment variable in production

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user_id = decoded.user_id;
    next();
  });
};

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Database connection
const db = mysql.createPool({
  port: 3307,
  host: "localhost",
  user: "admin",
  password: "password",
  database: "healthtracker",
});

db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Setup routes
setupAuthRoutes(app);
setupActivitiesRoutes(app, authenticate);
setupMealsRoutes(app, authenticate);
setupExercisesRoutes(app, authenticate);
