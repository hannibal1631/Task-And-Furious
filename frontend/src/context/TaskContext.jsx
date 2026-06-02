import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from './AuthContext.jsx';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    if (!user?._id) return;

    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE_URL}/tasks/user/${user._id}`, {
        withCredentials: true,
      });

      setTasks(res.data?.data || []);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
