// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import API_BASE_URL from '../config/api.js';
// import { useAuth } from './AuthContext.jsx';

// const TaskContext = createContext();

// export function TaskProvider({ children }) {
//   const { user } = useAuth();

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchTasks = async () => {
//     if (!user?._id) return;

//     setLoading(true);

//     try {
//       const res = await axios.get(`${API_BASE_URL}/tasks/user/${user._id}`, {
//         withCredentials: true,
//       });

//       setTasks(res.data?.data || []);
//     } catch (err) {
//       console.error('Failed to fetch tasks', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [user]);

//   return (
//     <TaskContext.Provider
//       value={{
//         tasks,
//         setTasks,
//         loading,
//         fetchTasks,
//       }}
//     >
//       {children}
//     </TaskContext.Provider>
//   );
// }

// export const useTasks = () => useContext(TaskContext);

import { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';

import API_BASE_URL from '../config/api.js';

import { useAuth } from './AuthContext.jsx';

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all tasks
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

  // get the actual date + time of a task
  const getTaskDateTime = (task) => {
    if (!task?.date) return null;

    const taskDateTime = new Date(task.date);

    if (task.time) {
      const [hours, minutes] = task.time.split(':');

      taskDateTime.setHours(Number(hours), Number(minutes), 0, 0);
    }

    return taskDateTime;
  };

  // check whether a task has failed
  const isTaskFailed = (task) => {
    const taskDateTime = getTaskDateTime(task);

    if (!taskDateTime) return false;

    return task.status !== 'completed' && taskDateTime < new Date();
  };

  // active tasks
  const activeTasks = tasks.filter((task) => {
    if (!task.date) return false;

    if (task.status !== 'pending') return false;

    const taskDateTime = getTaskDateTime(task);

    if (!taskDateTime) return false;

    return taskDateTime >= new Date();
  });

  // upcoming tasks
  const upcomingTasks = tasks.filter((task) => {
    if (!task.date) return false;

    const taskDateTime = getTaskDateTime(task);

    if (!taskDateTime) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return taskDateTime >= tomorrow;
  });

  // completed tasks
  const completedTasks = tasks.filter((task) => {
    if (task.status !== 'completed') return false;

    if (!task.date) return false;

    const taskDateTime = getTaskDateTime(task);

    if (!taskDateTime) return false;

    return taskDateTime <= new Date();
  });

  // failed tasks
  const failedTasks = tasks.filter((task) => {
    return isTaskFailed(task);
  });

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        loading,
        fetchTasks,

        // task helpers
        getTaskDateTime,
        isTaskFailed,

        // filtered task collections
        activeTasks,
        upcomingTasks,
        completedTasks,
        failedTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);