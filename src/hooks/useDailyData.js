import { useState, useEffect } from "react";

const STORAGE_KEY = "healthtrack_daily_logs";

const getStoredData = (date) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const allData = stored ? JSON.parse(stored) : {};
  return allData[date] || { activities: [], meals: [], exercises: [] };
};

const useDailyData = (date) => {
  const [dayData, setDayData] = useState(() => getStoredData(date));

  useEffect(() => {
    setDayData(getStoredData(date));
  }, [date]);

  const saveData = (newData) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allData = stored ? JSON.parse(stored) : {};
    allData[date] = newData;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allData));
    setDayData(newData);
  };

  const addActivity = (activity) => {
    const newActivity = { ...activity, id: crypto.randomUUID() };
    const newData = {
      ...dayData,
      activities: [...dayData.activities, newActivity],
    };
    saveData(newData);
  };

  const addMeal = (meal) => {
    const newMeal = { ...meal, id: crypto.randomUUID() };
    const newData = { ...dayData, meals: [...dayData.meals, newMeal] };
    saveData(newData);
  };

  const addExercise = (exercise) => {
    const newExercise = { ...exercise, id: crypto.randomUUID() };
    const newData = {
      ...dayData,
      exercises: [...dayData.exercises, newExercise],
    };
    saveData(newData);
  };

  const removeItem = (type, id) => {
    const newData = {
      ...dayData,
      [type]: dayData[type].filter((item) => item.id !== id),
    };
    saveData(newData);
  };

  return { dayData, addActivity, addMeal, addExercise, removeItem };
};

export default useDailyData;
