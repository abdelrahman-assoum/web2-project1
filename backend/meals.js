import db from "./db.js";

export const setupMealsRoutes = (app, authenticate) => {
  /* ----------------------------------------------------
     GET ALL MEALS
  ---------------------------------------------------- */
  app.get("/meals", authenticate, (req, res) => {
    const user_id = req.user_id;
    const q = "SELECT * FROM meals WHERE user_id = ? ORDER BY `date` DESC";

    db.query(q, [user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.length === 0) {
          return res.status(204).send("No meals found");
        }
        return res.status(200).json(data);
      }
    });
  });

  /* ----------------------------------------------------
     GET MEAL BY ID
  ---------------------------------------------------- */
  app.get("/meals/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Meal ID must be a number" });
    }

    const q = "SELECT * FROM meals WHERE meal_id = ? AND user_id = ?";

    db.query(q, [id, user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.length === 0) {
          return res.status(404).json({ message: "Meal not found" });
        }
        return res.status(200).json(data[0]);
      }
    });
  });

  /* ----------------------------------------------------
     ADD NEW MEAL
  ---------------------------------------------------- */
  app.post("/meals", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { type, description, calories, date } = req.body;

    const errors = [];
    if (!type) {
      errors.push("Meal type is required");
    }
    if (!description) {
      errors.push("Description is required");
    }
    if (!calories) {
      errors.push("Calories is required");
    }
    if (!date) {
      errors.push("Date is required");
    }
    if (errors.length > 0) {
      return res.status(400).json({ message: errors });
    }
    const q =
      "INSERT INTO meals (user_id, `type`, description, calories, `date`) VALUES (?, ?, ?, ?, ?)";

    db.query(q, [user_id, type, description, calories, date], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        return res.status(201).json({
          message: "Meal created successfully",
          id: data.insertId,
        });
      }
    });
  });

  /* ----------------------------------------------------
     UPDATE MEAL
  ---------------------------------------------------- */
  app.put("/meals/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { id } = req.params;
    const { type, description, calories, date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Meal ID must be a number" });
    }

    if (!type || !description || !calories || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const q =
      "UPDATE meals SET `type` = ?, description = ?, calories = ?, `date` = ? WHERE meal_id = ? AND user_id = ?";

    db.query(
      q,
      [type, description, calories, date, id, user_id],
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", error: err });
        } else {
          if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Meal not found" });
          }
          return res.status(200).json({ message: "Meal updated successfully" });
        }
      }
    );
  });

  /* ----------------------------------------------------
     DELETE MEAL
  ---------------------------------------------------- */
  app.delete("/meals/:id", authenticate, (req, res) => {
    const user_id = req.user_id;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Meal ID is required" });
    }

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "Meal ID must be a number" });
    }

    const q = "DELETE FROM meals WHERE meal_id = ? AND user_id = ?";

    db.query(q, [id, user_id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: "Database error", error: err });
      } else {
        if (data.affectedRows === 0) {
          return res.status(404).json({ message: "Meal not found" });
        }
        return res.status(200).json({ message: "Meal deleted successfully" });
      }
    });
  });
};
