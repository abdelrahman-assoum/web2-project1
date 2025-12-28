import db from "./db.js";

export const setupActivitiesRoutes = (app, authenticate) => {
  /* ----------------------------------------------------
     GET ALL ACTIVITIES
  ---------------------------------------------------- */
  app.get("/activities", authenticate, (req, res) => {
    const user_id = req.user_id;
    const q = "SELECT * FROM activities WHERE user_id = ? ORDER BY `date` DESC";

    db.query(q, [user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.length === 0) {
          return res.status(204).send("No activities found");
        }
        return res.status(200).json(data);
      }
    });
  });

  /* ----------------------------------------------------
     GET ACTIVITIES BY DATE
  ---------------------------------------------------- */
  app.get("/activities/date/:date", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const q =
      "SELECT * FROM activities WHERE user_id = ? AND date = ? ORDER BY date DESC";

    db.query(q, [user_id, date], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.length === 0) {
          return res.status(200).json([]);
        }
        return res.status(200).json(data);
      }
    });
  });

  /* ----------------------------------------------------
     ADD NEW ACTIVITY
  ---------------------------------------------------- */
  app.post("/activities", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { activity_title, activity_type, duration_min, date } = req.body;

    const errors = [];
    if (!activity_title) {
      errors.push("Activity title is required");
    }
    if (!activity_type) {
      errors.push("Activity type is required");
    }
    if (!duration_min) {
      errors.push("Duration is required");
    }
    if (!date) {
      errors.push("Date is required");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }
    const q =
      "INSERT INTO activities (user_id, activity_title, activity_type, duration_min, `date`) VALUES (?, ?, ?, ?, ?)";

    db.query(
      q,
      [user_id, activity_title, activity_type, duration_min, date],
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        } else {
          return res.status(201).json({
            message: "Activity created successfully",
            id: data.insertId,
          });
        }
      }
    );
  });

  /* ----------------------------------------------------
     UPDATE ACTIVITY
  ---------------------------------------------------- */
  app.put("/activities/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { id } = req.params;
    const { activity_title, activity_type, duration_min, date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Activity ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Activity ID must be a number" });
    }

    if (!activity_title || !activity_type || !duration_min || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const q =
      "UPDATE activities SET activity_title = ?, activity_type = ?, duration_min = ?, `date` = ? WHERE activity_id = ? AND user_id = ?";

    db.query(
      q,
      [activity_title, activity_type, duration_min, date, id, user_id],
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        } else {
          if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Activity not found" });
          }
          return res
            .status(200)
            .json({ message: "Activity updated successfully" });
        }
      }
    );
  });

  /* ----------------------------------------------------
     DELETE ACTIVITY
  ---------------------------------------------------- */
  app.delete("/activities/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Activity ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Activity ID must be a number" });
    }

    const q = "DELETE FROM activities WHERE activity_id = ? AND user_id = ?";

    db.query(q, [id, user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.affectedRows === 0) {
          return res.status(404).json({ message: "Activity not found" });
        }
        return res
          .status(200)
          .json({ message: "Activity deleted successfully" });
      }
    });
  });
};
