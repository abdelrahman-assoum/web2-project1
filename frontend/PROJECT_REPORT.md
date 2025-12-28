# HealthTrack - Web 2 Project Phase 2



**Author:** Abdelrahman Assoum  
**Date:** December 2025  
**Project:** Wellness & Fitness Tracking Application

---

## 1. Abstract
HealthTrack is a full-stack web application that helps users log daily activities, meals, and exercises, providing a wellness score based on their inputs. The application features a React frontend for the user interface and a Node.js/Express backend with MySQL database for data persistence. Users can register, login, and manage their daily logs securely. The backend is deployed on Render for the backend and TiDB Cloud for the database, and the frontend is deployed on Vercel.

---

## 2. System Design (Overview)
Architecture: Full-stack web application with client-server architecture.

```
Frontend
  └── React SPA (Frontend)
       ├── Layout (Navbar, Footer)
       ├── Pages (Home, Features, About, Contact, DailyLog, Login, Register)
       ├── Protected Routes
       └── API Calls to Backend
Backend (Node.js/Express)
  ├── Authentication (JWT)
  ├── Routes (Activities, Meals, Exercises)
  └── Database (MySQL/TiDB Cloud)
```
Data: Stored in MySQL database per user, with JWT-based authentication.  
State: Managed with React `useState`, `useEffect`, and custom hooks.  
Routing: Client-side routing with React Router, API calls to backend endpoints.  
Deployment: Frontend on Vercel/Netlify, Backend on Render, Database on TiDB Cloud.

---

## 3. Technologies Used
### Frontend:
- React (UI + hooks)
- React Router DOM (client routing)
- Tailwind CSS (styling utilities)
- Vite (fast dev + build)
- Axios (API calls)
- `crypto.randomUUID()` (unique IDs)

### Backend:
- Node.js (runtime)
- Express.js (web framework)
- MySQL (database, via TiDB Cloud)
- JWT (authentication)
- bcrypt (password hashing)
- CORS (cross-origin requests)
- dotenv (environment variables)

### Deployment:
- Render (backend hosting)
- TiDB Cloud (database hosting)

---

## 4. Key Code Snippets
### 4.1 Data Hook (useDailyData) - API Version
```javascript
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useDailyData = (date) => {
  const [dayData, setDayData] = useState({
    activities: [],
    meals: [],
    exercises: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [activitiesRes, mealsRes, exercisesRes] = await Promise.all([
        axios.get(`${API_URL}/activities/date/${date}`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_URL}/meals/date/${date}`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_URL}/exercises/date/${date}`, {
          headers: getAuthHeaders(),
        }),
      ]);

      setDayData({
        activities: activitiesRes.data,
        meals: mealsRes.data,
        exercises: exercisesRes.data,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const addActivity = async (activity) => {
    try {
      const response = await axios.post(
        `${API_URL}/activities`,
        {
          activity_title: activity.title,
          activity_type: activity.category,
          duration_min: activity.duration,
          date: date,
        },
        { headers: getAuthHeaders() }
      );

      await fetchData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add activity");
    }
  };

  const addMeal = async (meal) => {
    try {
      const response = await axios.post(
        `${API_URL}/meals`,
        {
          type: meal.mealType,
          description: meal.description,
          calories: meal.calories,
          date: date,
        },
        { headers: getAuthHeaders() }
      );

      await fetchData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add meal");
    }
  };

  const addExercise = async (exercise) => {
    try {
      const response = await axios.post(
        `${API_URL}/exercises`,
        {
          type: exercise.type,
          duration_min: exercise.duration,
          intensity: exercise.intensity,
          date: date,
        },
        { headers: getAuthHeaders() }
      );

      await fetchData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add exercise");
    }
  };

  const removeItem = async (type, id) => {
    try {
      const endpoint = `${API_URL}/${type}/${id}`;
      await axios.delete(endpoint, { headers: getAuthHeaders() });
      await fetchData();
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to delete item");
    }
  };

  return {
    dayData,
    addActivity,
    addMeal,
    addExercise,
    removeItem,
    isLoading,
    error,
  };
};

export default useDailyData;
```

### 4.2 Backend Server Setup (index.js)
```javascript
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
```

### 4.3 Authentication Route (auth.js)
```javascript
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
```

### 4.4 Database Connection (db.js)
```javascript
import mysql from "mysql";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ssl =
  process.env.DB_ENABLE_SSL === "true"
    ? {
        minVersion: "TLSv1.2",
        ca: process.env.DB_CA_PATH
          ? fs.readFileSync(process.env.DB_CA_PATH)
          : undefined,
      }
    : null;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl,
});

export default db;
```

### 4.5 Wellness Score Calculation (DailyLog.jsx)
```javascript
  const activitiesCount = dayData.activities.length;
  const totalExerciseMinutes = dayData.exercises.reduce(
    (sum, ex) => sum + ex.duration_min,
    0
  );
  const totalCalories = dayData.meals.reduce(
    (sum, meal) => sum + meal.calories,
    0
  );
  const mealsCount = dayData.meals.length;

  const activityContribution = Math.round(
    Math.min((activitiesCount / 5) * 25, 25)
  );
  const exerciseContribution = Math.round(
    Math.min((totalExerciseMinutes / 30) * 50, 50)
  );
  const mealContribution = Math.round(Math.min((mealsCount / 3) * 10, 10));

  let calorieContribution = 0;
  if (totalCalories >= 1800 && totalCalories <= 2500) {
    calorieContribution = 15;
  } else if (totalCalories >= 1500 && totalCalories <= 3000) {
    calorieContribution = 10;
  } else if (totalCalories >= 1200 && totalCalories <= 3500) {
    calorieContribution = 5;
  } else if (totalCalories > 0) {
    calorieContribution = 2;
  }

  const calculateWellnessScore = () => {
    const score =
      activityContribution +
      exerciseContribution +
      mealContribution +
      calorieContribution;
    return Math.round(Math.min(score, 100));
  };

  const wellnessScore = calculateWellnessScore();
```

## 5. Deployment
The application is deployed as follows:
- **Frontend**: Hosted on Vercel, a platform for static site hosting and serverless functions.
- **Backend**: Hosted on Render, a cloud platform for web applications. The backend runs the Node.js/Express server and handles API requests.
- **Database**: TiDB Cloud, a MySQL-compatible database service, used for storing user data, activities, meals, and exercises securely.

Environment variables are used for sensitive information such as database credentials and JWT secrets.

---

## 6. Future Scope
- **Reports Generation**: Implement features to generate monthly, weekly, and daily reports summarizing user activities, meals, and exercises.
- **Mobile App**: Develop a mobile application using React Native or Flutter to allow users to log data on-the-go.
- **Advanced Analytics**: Add charts and graphs for better visualization of wellness trends over time.
- **Social Features**: Allow users to share achievements or compete with friends.
- **Integration with Wearables**: Connect with fitness trackers like Fitbit or Apple Watch for automatic data logging.

---
