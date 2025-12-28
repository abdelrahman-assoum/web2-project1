-- =========================
-- 1) TABLES WITH RELATIONS
-- =========================


CREATE TABLE auth (
  user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE activities (
  activity_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  activity_title VARCHAR(120) NOT NULL,
  activity_type ENUM('Work','Study','Sleep','Other') NOT NULL,
  duration_min SMALLINT UNSIGNED NOT NULL,
  `date` DATE NOT NULL,
  CONSTRAINT fk_activities_user
    FOREIGN KEY (user_id) REFERENCES auth(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE meals (
  meal_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  `type` ENUM('Breakfast','Lunch','Dinner','Snack') NOT NULL,
  description VARCHAR(255) NOT NULL,
  calories INT UNSIGNED NOT NULL,
  `date` DATE NOT NULL,
  CONSTRAINT fk_meals_user
    FOREIGN KEY (user_id) REFERENCES auth(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE exercises (
  exercise_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  duration_min SMALLINT UNSIGNED NOT NULL,
  intensity ENUM('Low','Medium','High') NOT NULL,
  `date` DATE NOT NULL,
  CONSTRAINT fk_exercises_user
    FOREIGN KEY (user_id) REFERENCES auth(user_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- =========================
-- 2) DUMMY DATA
-- One user only: admin / root (NOT encrypted, as requested)
-- 5 rows for each other table, all belonging to that user
-- Dates between 2025-12-25 and 2025-12-28
-- =========================

-- One user
INSERT INTO auth (username, `password`, name)
VALUES ('admin', 'root', 'Admin');

-- Use the inserted user's id (safe even if id isn't 1)
SET @admin_id := LAST_INSERT_ID();

-- activities (5 rows)
INSERT INTO activities (user_id, activity_title, activity_type, duration_min, `date`) VALUES
(@admin_id, 'Client UI revisions', 'Work', 120, '2025-12-25'),
(@admin_id, 'PortSwigger practice', 'Study', 90, '2025-12-25'),
(@admin_id, 'Algorithms review', 'Study', 75, '2025-12-26'),
(@admin_id, 'Errands + commute', 'Other', 60, '2025-12-27'),
(@admin_id, 'Night sleep', 'Sleep', 420, '2025-12-28');

-- meals (5 rows)
INSERT INTO meals (user_id, `type`, description, calories, `date`) VALUES
(@admin_id, 'Breakfast', 'Oats with banana', 420, '2025-12-25'),
(@admin_id, 'Lunch', 'Chicken sandwich', 650, '2025-12-25'),
(@admin_id, 'Snack', 'Greek yogurt', 180, '2025-12-26'),
(@admin_id, 'Dinner', 'Rice + grilled fish', 720, '2025-12-27'),
(@admin_id, 'Breakfast', 'Eggs and toast', 500, '2025-12-28');

-- exercises (5 rows)
INSERT INTO exercises (user_id, `type`, duration_min, intensity, `date`) VALUES
(@admin_id, 'Walking', 30, 'Low', '2025-12-25'),
(@admin_id, 'Push-ups', 15, 'Medium', '2025-12-26'),
(@admin_id, 'Jogging', 25, 'Medium', '2025-12-26'),
(@admin_id, 'Weight training', 45, 'High', '2025-12-27'),
(@admin_id, 'Stretching', 20, 'Low', '2025-12-28');
