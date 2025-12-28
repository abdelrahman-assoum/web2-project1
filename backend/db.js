import mysql from "mysql";

const db = mysql.createPool({
  port: 3307,
  host: "localhost",
  user: "admin",
  password: "password",
  database: "healthtracker",
});

export default db;
