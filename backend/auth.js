import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const setupAuthRoutes = (app) => {
  /* ----------------------------------------------------
     REGISTER
  ---------------------------------------------------- */
  app.post("/register", (req, res) => {
    const { username, password, name } = req.body;

    const errors = [];
    if (!username) {
      errors.push("Username is required");
    }
    if (!password) {
      errors.push("Password is required");
    }
    if (!name) {
      errors.push("Name is required");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Hashing error", error: err });
      }
      const query =
        "INSERT INTO auth (username, `password`, name) VALUES (?, ?, ?)";
      db.query(query, [username, hashedPassword, name], (err, result) => {
        if (err) {
          if (err.errno === 1062) {
            return res.status(400).json({ message: err.sqlMessage });
          }
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        }
        return res.status(201).json({
          message: "User registered successfully",
          id: result.insertId,
        });
      });
    });
  });

  /* ----------------------------------------------------
     LOGIN
  ---------------------------------------------------- */
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const query =
      "SELECT user_id, username, `password`, name FROM auth WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Password Comparison error", error: err });
        }
        if (!isValid) {
          return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ user_id: user.user_id }, jwtSecret, {
          expiresIn: "1h",
        });
        return res.status(200).json({
          token,
          user: {
            user_id: user.user_id,
            username: user.username,
            name: user.name,
          },
        });
      });
    });
  });
};
