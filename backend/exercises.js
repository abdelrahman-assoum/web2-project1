import db from "./db.js";

export const setupExercisesRoutes = (app, authenticate) => {
  /* ----------------------------------------------------
     GET ALL EXERCISES
  ---------------------------------------------------- */
  app.get("/exercises", authenticate, (req, res) => {
    const user_id = req.user_id;
    const q = "SELECT * FROM exercises WHERE user_id = ? ORDER BY `date` DESC";

    db.query(q, [user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.length === 0) {
          return res.status(204).send("No exercises found");
        }
        return res.status(200).json(data);
      }
    });
  });

  /* ----------------------------------------------------
     ADD NEW EXERCISE
  ---------------------------------------------------- */
  app.post("/exercises", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { type, duration_min, intensity, date } = req.body;

    const errors = [];
    if (!type) {
      errors.push("Exercise type is required");
    }
    if (!duration_min) {
      errors.push("Duration is required");
    }
    if (!intensity) {
      errors.push("Intensity is required");
    }
    if (!date) {
      errors.push("Date is required");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }
    const q =
      "INSERT INTO exercises (user_id, `type`, duration_min, intensity, `date`) VALUES (?, ?, ?, ?, ?)";

    db.query(q, [user_id, type, duration_min, intensity, date], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        return res.status(201).json({
          message: "Exercise created successfully",
          id: data.insertId,
        });
      }
    });
  });

  /* ----------------------------------------------------
     UPDATE EXERCISE
  ---------------------------------------------------- */
  app.put("/exercises/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { id } = req.params;
    const { type, duration_min, intensity, date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Exercise ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Exercise ID must be a number" });
    }

    if (!type || !duration_min || !intensity || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const q =
      "UPDATE exercises SET `type` = ?, duration_min = ?, intensity = ?, `date` = ? WHERE exercise_id = ? AND user_id = ?";

    db.query(
      q,
      [type, duration_min, intensity, date, id, user_id],
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        } else {
          if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Exercise not found" });
          }
          return res
            .status(200)
            .json({ message: "Exercise updated successfully" });
        }
      }
    );
  });

  /* ----------------------------------------------------
     DELETE EXERCISE
  ---------------------------------------------------- */
  app.delete("/exercises/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Exercise ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Exercise ID must be a number" });
    }

    const q = "DELETE FROM exercises WHERE exercise_id = ? AND user_id = ?";

    db.query(q, [id, user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.affectedRows === 0) {
          return res.status(404).json({ message: "Exercise not found" });
        }
        return res
          .status(200)
          .json({ message: "Exercise deleted successfully" });
      }
    });
  });
};
