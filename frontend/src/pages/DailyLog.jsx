import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useDailyData from "../hooks/useDailyData.js";

const DailyLog = () => {
  const { date } = useParams();
  const navigate = useNavigate();
  const { dayData, addActivity, addMeal, addExercise, removeItem } =
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

  const handleDateChange = (e) => {
    navigate(`/day/${e.target.value}`);
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!activityForm.title || !activityForm.duration) {
      alert("Please fill in title and duration.");
      return;
    }
    addActivity({ ...activityForm, duration: parseInt(activityForm.duration) });
    setActivityForm({ title: "", category: "Work", duration: "" });
  };

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!mealForm.description || !mealForm.calories) {
      alert("Please fill in description and calories.");
      return;
    }
    addMeal({ ...mealForm, calories: parseInt(mealForm.calories) });
    setMealForm({ mealType: "Breakfast", description: "", calories: "" });
  };

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!exerciseForm.type || !exerciseForm.duration) {
      alert("Please fill in type and duration.");
      return;
    }
    addExercise({ ...exerciseForm, duration: parseInt(exerciseForm.duration) });
    setExerciseForm({ type: "", duration: "", intensity: "Medium" });
  };

  const activitiesCount = dayData.activities.length;
  const totalExerciseMinutes = dayData.exercises.reduce(
    (sum, ex) => sum + ex.duration,
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

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 bg-linear-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Daily Log
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6">
            Track your activities, meals, and workouts for{" "}
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="inline-block bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              📅 Select Date
            </label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className="border-2 border-gray-300 rounded-lg px-4 py-2.5 text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer hover:border-orange-400 transition-colors duration-300 min-w-[200px]"
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
                    key={activity.id}
                    className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.category} • {activity.duration} min
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem("activities", activity.id)}
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
                    key={meal.id}
                    className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {meal.mealType}: {meal.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {meal.calories} cal
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem("meals", meal.id)}
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
                    key={exercise.id}
                    className="flex justify-between items-center border-2 border-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {exercise.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exercise.duration} min • {exercise.intensity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem("exercises", exercise.id)}
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
    </div>
  );
};

export default DailyLog;
