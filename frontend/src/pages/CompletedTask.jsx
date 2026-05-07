import { useState, useEffect } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function CompletedTask() {
  const today = new Date().toISOString().split('T')[0];

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

        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const completedTasks = allTasks.filter((task) => {
          // must be completed
          if (task.status !== 'completed') return false;

          // must have date
          if (!task.date) return false;

          const taskDate = new Date(task.date);

          // must already be completed in real time
          if (taskDate > now) return false;

          // exact date filtering
          if (selectedDate) {
            return task.date.split('T')[0] === selectedDate;
          }

          // default current month filtering
          return (
            taskDate.getMonth() === currentMonth &&
            taskDate.getFullYear() === currentYear
          );
        });

        setTasks(completedTasks);
      } catch (err) {
        console.error('Failed to fetch completed tasks', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [selectedDate, user?._id]);

  return (
    <div className='flex flex-col gap-6'>
      {/* Header Row */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <h1 className='text-4xl font-bold underline'>Completed Task</h1>

        <div className='flex gap-3'>
          <input
            type='date'
            max={today}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='bg-white border border-gray-300 px-3 py-2 rounded-md cursor-pointer 
                     focus:outline-none focus:ring-2 focus:ring-black transition'
          />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className='border px-3 py-1 bg-gray-200 rounded-md'
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className='max-w-full py-4 px-5 bg-yellow-400 rounded-lg shadow-sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <p className='col-span-full text-center text-gray-800 font-medium'>
              Loading...
            </p>
          ) : tasks.length > 0 ? (
            tasks.map((task) => <TaskCardMin key={task._id} task={task} />)
          ) : (
            <p className='col-span-full text-center text-gray-800 font-medium'>
              {selectedDate
                ? 'No completed tasks for this date'
                : 'No completed tasks for this month'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletedTask;
