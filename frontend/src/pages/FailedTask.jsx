import { useState, useEffect } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function FailedTask() {
  // yesterday date
  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  const yesterday = getYesterday();

  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?._id) return;

      setLoading(true);

      try {
        const res = await axios.get(`${API_BASE_URL}/tasks/user/${user._id}`);

        const allTasks = res.data?.data || [];

        const now = new Date();

        const failedTasks = allTasks.filter((task) => {
          // must have a date
          if (!task.date) return false;

          const taskDate = new Date(task.date);

          // failed means:
          // not completed AND deadline already passed
          const isFailed = task.status !== 'completed' && taskDate < now;

          if (!isFailed) return false;

          // if user selected a specific date
          if (selectedDate) {
            return task.date.split('T')[0] === selectedDate;
          }

          // default -> show current month's failed tasks
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          return (
            taskDate.getMonth() === currentMonth &&
            taskDate.getFullYear() === currentYear
          );
        });

        setTasks(failedTasks);
      } catch (err) {
        console.error('Failed to fetch failed tasks', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedDate, user?._id]);

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h1 className='text-4xl font-bold underline'>Failed Task</h1>
        </div>

        <div className='flex items-center gap-3'>
          <input
            type='date'
            max={yesterday}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='bg-white border border-gray-300 px-3 py-2 rounded-md cursor-pointer 
                     focus:outline-none focus:ring-2 focus:ring-black transition'
          />

          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className='px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition cursor-pointer'
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className='max-w-full py-4 px-5 bg-yellow-400 rounded-lg shadow-sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <p className='col-span-full text-center text-gray-800 font-medium'>
              Loading...
            </p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => <TaskCardMin key={task._id} task={task} />)
          ) : (
            <p className='col-span-full text-center text-red-700 font-medium'>
              No failed tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FailedTask;
