import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useDailyData = (date) => {
  const [dayData, setDayData] = useState({
    activities: [],
    meals: [],
    exercises: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [activitiesRes, mealsRes, exercisesRes] = await Promise.all([
        axios.get(`${API_URL}/activities/date/${date}`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_URL}/meals/date/${date}`, {
          headers: getAuthHeaders(),
        }),
        axios.get(`${API_URL}/exercises/date/${date}`, {
          headers: getAuthHeaders(),
        }),
      ]);

      setDayData({
        activities: activitiesRes.data,
        meals: mealsRes.data,
        exercises: exercisesRes.data,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const addActivity = async (activity) => {
    try {
      const response = await axios.post(
        `${API_URL}/activities`,
        {
          activity_title: activity.title,
          activity_type: activity.category,
          duration_min: activity.duration,
          date: date,
        },
        { headers: getAuthHeaders() }
      );

      await fetchData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add activity");
    }
  };

  const addMeal = async (meal) => {
    try {
      const response = await axios.post(
        `${API_URL}/meals`,
        {
          type: meal.mealType,
          description: meal.description,
          calories: meal.calories,
          date: date,
        },
        { headers: getAuthHeaders() }
      );

      await fetchData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add meal");
    }
  };

  const addExercise = async (exercise) => {
    try {
      const response = await axios.post(
        `${API_URL}/exercises`,
        {
          type: exercise.type,
          duration_min: exercise.duration,
          intensity: exercise.intensity,
          date: date,
        },
        { headers: getAuthHeaders() }
      );

      await fetchData();
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to add exercise");
    }
  };

  const removeItem = async (type, id) => {
    try {
      const endpoint = `${API_URL}/${type}/${id}`;
      await axios.delete(endpoint, { headers: getAuthHeaders() });
      await fetchData();
    } catch (err) {
      throw new Error(err.response?.data?.message || "Failed to delete item");
    }
  };

  return {
    dayData,
    addActivity,
    addMeal,
    addExercise,
    removeItem,
    isLoading,
    error,
  };
};

export default useDailyData;
