import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useDailyData from "../hooks/useDailyData.js";

const DailyLog = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { dayData, addActivity, addMeal, addExercise, removeItem, isLoading } =
    useDailyData(date);

  const [activityForm, setActivityForm] = useState({
    title: "",
    category: "Work",
    duration: "",
  });
  const [mealForm, setMealForm] = useState({
    mealType: "Breakfast",
    description: "",
    calories: "",
  });
  const [exerciseForm, setExerciseForm] = useState({
    type: "",
    duration: "",
    intensity: "Medium",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const [deleteDialog, setDeleteDialog] = useState({
    show: false,
    type: "",
    id: "",
    name: "",
  });

  const handleDateChange = (e) => {
    navigate(`/day/${e.target.value}`);
  };

  const handleDelete = async () => {
    try {
      await removeItem(deleteDialog.type, deleteDialog.id);
      setMessage({
        type: "success",
        text: `${deleteDialog.type.slice(0, -1)} deleted successfully!`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.message || `Failed to delete ${deleteDialog.type.slice(0, -1)}`,
      });
    }
    setDeleteDialog({ show: false, type: "", id: "", name: "" });
  };

  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!activityForm.title || !activityForm.duration) {
      setMessage({ type: "error", text: "Please fill in title and duration." });
      return;
    }
    try {
      await addActivity({
        ...activityForm,
        duration: parseInt(activityForm.duration),
      });
      setActivityForm({ title: "", category: "Work", duration: "" });
      setMessage({ type: "success", text: "Activity added successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to add activity",
      });
    }
  };

  const handleAddMeal = async (e) => {
    e.preventDefault();
    if (!mealForm.description || !mealForm.calories) {
      setMessage({
        type: "error",
        text: "Please fill in description and calories.",
      });
      return;
    }
    try {
      await addMeal({ ...mealForm, calories: parseInt(mealForm.calories) });
      setMealForm({ mealType: "Breakfast", description: "", calories: "" });
      setMessage({ type: "success", text: "Meal added successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to add meal" });
    }
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    if (!exerciseForm.type || !exerciseForm.duration) {
      setMessage({ type: "error", text: "Please fill in type and duration." });
      return;
    }
    try {
      await addExercise({
        ...exerciseForm,
        duration: parseInt(exerciseForm.duration),
      });
      setExerciseForm({ type: "", duration: "", intensity: "Medium" });
      setMessage({ type: "success", text: "Exercise added successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Failed to add exercise",
      });
    }
  };

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

  const getScoreStatus = (score) => {
    if (score >= 80)
      return {
        color: "from-green-500 to-green-600",
        message: "Excellent! 🎉",
        textColor: "text-green-100",
      };
    if (score >= 60)
      return {
        color: "from-blue-500 to-blue-600",
        message: "Good Job! 👍",
        textColor: "text-blue-100",
      };
    if (score >= 40)
      return {
        color: "from-yellow-500 to-yellow-600",
        message: "Keep Going! 💪",
        textColor: "text-yellow-100",
      };
    if (score >= 20)
      return {
        color: "from-orange-500 to-orange-600",
        message: "Needs Work 📈",
        textColor: "text-orange-100",
      };
    return {
      color: "from-red-500 to-red-600",
      message: "Get Active! 🚀",
      textColor: "text-red-100",
    };
  };

  const scoreStatus = getScoreStatus(wellnessScore);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">
            Loading your daily log...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 lg:flex lg:items-center lg:justify-between">
          <div className="mb-6 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Daily Log
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              Track your activities, meals, and workouts for
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="w-full lg:w-auto lg:inline-block bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              📅 Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2.5 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer hover:border-orange-400 transition-colors duration-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Activities
                </h3>
                <p className="text-4xl font-bold">{activitiesCount}</p>
                <p className="text-xs mt-2 opacity-80">
                  +{activityContribution} pts (max 25)
                </p>
              </div>
              <div className="text-5xl opacity-80">📝</div>
            </div>
          </div>
          <div className="bg-linear-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Exercise
                </h3>
                <p className="text-4xl font-bold">
                  {totalExerciseMinutes} <span className="text-xl">min</span>
                </p>
                <p className="text-xs mt-2 opacity-80">
                  +{exerciseContribution} pts (max 50)
                </p>
              </div>
              <div className="text-5xl opacity-80">🏋️</div>
            </div>
          </div>
          <div className="bg-linear-to-br from-orange-500 to-orange-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Calories
                </h3>
                <p className="text-4xl font-bold">{totalCalories}</p>
                <p className="text-xs mt-2 opacity-80">
                  +{mealContribution + calorieContribution} pts (max 25)
                </p>
              </div>
              <div className="text-5xl opacity-80">🍎</div>
            </div>
          </div>
          <div
            className={`bg-linear-to-br ${scoreStatus.color} p-6 rounded-2xl shadow-lg text-white transform hover:scale-105 transition-all duration-300`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-90">
                  Wellness Score
                </h3>
                <p className="text-4xl font-bold">{wellnessScore}</p>
                <p
                  className={`text-xs mt-2 font-semibold ${scoreStatus.textColor}`}
                >
                  {scoreStatus.message}
                </p>
              </div>
              <div className="text-5xl opacity-80">⭐</div>
            </div>
          </div>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2">
                {message.type === "success" ? "✅" : "❌"}
              </span>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-3xl mr-3">📝</div>
                <h3 className="text-2xl font-bold text-gray-800">Activities</h3>
              </div>
              <p className="text-xs text-blue-600 font-semibold ml-12">
                Worth up to 25 points • Target: 5 activities
              </p>
            </div>
            <form onSubmit={handleAddActivity} className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Activity title"
                value={activityForm.title}
                onChange={(e) =>
                  setActivityForm({ ...activityForm, title: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={activityForm.category}
                onChange={(e) =>
                  setActivityForm({ ...activityForm, category: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Work</option>
                <option>Study</option>
                <option>Sleep</option>
                <option>Other</option>
              </select>
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={activityForm.duration}
                onChange={(e) =>
                  setActivityForm({ ...activityForm, duration: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                + Add Activity
              </button>
            </form>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dayData.activities.length === 0 ? (
                <p className="text-gray-400 text-center py-6">
                  No activities logged yet
                </p>
              ) : (
                dayData.activities.map((activity) => (
                  <div
                    key={activity.activity_id}
                    className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {activity.activity_title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.activity_type} • {activity.duration_min} min
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setDeleteDialog({
                          show: true,
                          type: "activities",
                          id: activity.activity_id,
                          name: activity.activity_title,
                        });
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-3xl mr-3">🍎</div>
                <h3 className="text-2xl font-bold text-gray-800">Meals</h3>
              </div>
              <p className="text-xs text-orange-600 font-semibold ml-12">
                Worth up to 10 pts • Calories: +15 pts (1800-2500)
              </p>
            </div>
            <form onSubmit={handleAddMeal} className="space-y-4 mb-6">
              <select
                value={mealForm.mealType}
                onChange={(e) =>
                  setMealForm({ ...mealForm, mealType: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
              <input
                type="text"
                placeholder="Description"
                value={mealForm.description}
                onChange={(e) =>
                  setMealForm({ ...mealForm, description: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Calories"
                value={mealForm.calories}
                onChange={(e) =>
                  setMealForm({ ...mealForm, calories: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full bg-linear-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                + Add Meal
              </button>
            </form>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dayData.meals.length === 0 ? (
                <p className="text-gray-400 text-center py-6">
                  No meals logged yet
                </p>
              ) : (
                dayData.meals.map((meal) => (
                  <div
                    key={meal.meal_id}
                    className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {meal.type}: {meal.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {meal.calories} cal
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setDeleteDialog({
                          show: true,
                          type: "meals",
                          id: meal.meal_id,
                          name: meal.description,
                        });
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <div className="text-3xl mr-3">🏋️</div>
                <h3 className="text-2xl font-bold text-gray-800">Exercises</h3>
              </div>
              <p className="text-xs text-green-600 font-semibold ml-12">
                Worth up to 50 points • Target: 30 minutes
              </p>
            </div>
            <form onSubmit={handleAddExercise} className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Exercise type"
                value={exerciseForm.type}
                onChange={(e) =>
                  setExerciseForm({ ...exerciseForm, type: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={exerciseForm.duration}
                onChange={(e) =>
                  setExerciseForm({ ...exerciseForm, duration: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <select
                value={exerciseForm.intensity}
                onChange={(e) =>
                  setExerciseForm({
                    ...exerciseForm,
                    intensity: e.target.value,
                  })
                }
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                + Add Exercise
              </button>
            </form>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {dayData.exercises.length === 0 ? (
                <p className="text-gray-400 text-center py-6">
                  No exercises logged yet
                </p>
              ) : (
                dayData.exercises.map((exercise) => (
                  <div
                    key={exercise.exercise_id}
                    className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {exercise.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exercise.duration_min} min • {exercise.intensity}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setDeleteDialog({
                          show: true,
                          type: "exercises",
                          id: exercise.exercise_id,
                          name: exercise.type,
                        });
                      }}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg font-medium transition-all duration-300"
                    >
                      🗑️
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {deleteDialog.show && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete "{deleteDialog.name}"?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  setDeleteDialog({ show: false, type: "", id: "", name: "" })
                }
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyLog;
