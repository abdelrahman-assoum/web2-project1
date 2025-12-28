import mysql from "mysql";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const ssl =
  process.env.DB_ENABLE_SSL === "true"
    ? {
        minVersion: "TLSv1.2",
        // For TiDB Cloud Starter, you usually DON'T need a CA file
        // because Node trusts the public CA by default. :contentReference[oaicite:2]{index=2}
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
