import { useState, useEffect } from 'react';
import TaskCardMin from './TaskCardMin.jsx';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function Dashboard() {
  const { setView } = useOutletContext();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?._id) return;

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

    fetchTasks();
  }, [user]);

  const ongoingTasks = tasks.filter((task) => task.status === 'pending');

  const upcomingTasks = tasks.filter(
    (task) => task.date && new Date(task.date) > new Date(),
  );

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-4xl font-bold underline'>Dashboard</h1>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Ongoing Tasks</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          {loading ? (
            <p>Loading...</p>
          ) : ongoingTasks.length === 0 ? (
            <p>No ongoing tasks</p>
          ) : (
            ongoingTasks.map((task) => (
              <TaskCardMin
                key={task._id}
                task={task}
                onOpen={() => setView('max')}
              />
            ))
          )}
        </div>
      </div>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>Upcoming Tasks</h2>
        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          {loading ? (
            <p>Loading...</p>
          ) : upcomingTasks.length === 0 ? (
            <p>No upcoming tasks</p>
          ) : (
            upcomingTasks.map((task) => (
              <TaskCardMin
                key={task._id}
                task={task}
                onOpen={() => setView('max')}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
