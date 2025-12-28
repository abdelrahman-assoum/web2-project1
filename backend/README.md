# HealthTrack Backend

This is the backend API for the HealthTrack wellness and fitness tracking application. It provides RESTful endpoints for user authentication, managing daily activities, meals, and exercises.

## Technologies Used
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for building APIs
- **MySQL**: Database (hosted on TiDB Cloud)
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## How It Works
The backend is a Node.js application using Express.js to handle HTTP requests. It connects to a MySQL database hosted on TiDB Cloud for data persistence. User authentication is implemented using JWT tokens, which must be included in the Authorization header for protected routes.

### Key Features:
- User registration and login
- JWT-based authentication
- CRUD operations for activities, meals, and exercises
- Data validation and error handling
- Secure database connections with SSL

## Setup
1. Install dependencies: `npm install`
2. Create a `.env` file with the following variables:
   ```
   DB_HOST=your_tidb_host
   DB_PORT=4000
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your_database
   DB_ENABLE_SSL=true
   JWT_SECRET=your_jwt_secret
   ```
3. Run the server: `npm start`

The server will start on port 5000.

## API Routes Summary

### Authentication (No auth required)
- `POST /register` - Register a new user
  - Body: `{ username, password, name }`
- `POST /login` - Login user
  - Body: `{ username, password }`
  - Returns: JWT token and user info

### Activities (Auth required)
- `GET /activities` - Get all activities for the user
- `GET /activities/date/:date` - Get activities for a specific date
- `POST /activities` - Add a new activity
  - Body: `{ activity_title, activity_type, duration_min, date }`
- `PUT /activities/:id` - Update an activity
- `DELETE /activities/:id` - Delete an activity

### Meals (Auth required)
- `GET /meals` - Get all meals for the user
- `GET /meals/date/:date` - Get meals for a specific date
- `POST /meals` - Add a new meal
  - Body: `{ meal_type, calories, date }`
- `PUT /meals/:id` - Update a meal
- `DELETE /meals/:id` - Delete a meal

### Exercises (Auth required)
- `GET /exercises` - Get all exercises for the user
- `GET /exercises/date/:date` - Get exercises for a specific date
- `POST /exercises` - Add a new exercise
  - Body: `{ exercise_type, duration_min, date }`
- `PUT /exercises/:id` - Update an exercise
- `DELETE /exercises/:id` - Delete an exercise

## Authentication
For protected routes, include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Database Schema
The database includes the following tables:
- `auth`: User authentication data
- `activities`: User activities
- `meals`: User meals
- `exercises`: User exercises

Refer to `data.sql` for the complete schema.