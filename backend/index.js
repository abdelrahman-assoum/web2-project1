import cors from "cors";
import mysql from "mysql";
import express from "express";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

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
