import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "./db.js";
import { setupAuthRoutes } from "./auth.js";
import { setupActivitiesRoutes } from "./activities.js";
import { setupMealsRoutes } from "./meals.js";
import { setupExercisesRoutes } from "./exercises.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;

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

db.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

setupAuthRoutes(app);
setupActivitiesRoutes(app, authenticate);
setupMealsRoutes(app, authenticate);
setupExercisesRoutes(app, authenticate);
