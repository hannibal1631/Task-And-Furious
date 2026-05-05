import { useState, useEffect } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function UpcomingTask() {
  const [upcomingDate, setUpcomingDate] = useState('');
  const [allTasks, setAllTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const {user} = useAuth()

  // fetch all upcoming tasks
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?._id) return;

      setLoading(true);

      try {
        const res = await axios.get(`${API_BASE_URL}/tasks/user/${user._id}`);

        const data = res.data?.data || [];

        setAllTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const upcomingTasks = allTasks.filter((task) => {
    if (!task.date) return false;

    const due = new Date(task.date);
    due.setHours(0, 0, 0, 0);

    return due >= tomorrow;
  });

  // date filtering
  useEffect(() => {
    if (!upcomingDate) {
      setFilteredTasks(upcomingTasks);
      return;
    }

    const filtered = upcomingTasks.filter((task) => {
      return task.date?.split('T')[0] === upcomingDate;
    });

    setFilteredTasks(filtered);
  }, [upcomingDate, upcomingTasks, allTasks]);

  const tomorrowISO = tomorrow.toISOString().split('T')[0];

  const minDate = tomorrow.toISOString().split('T')[0];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // grouped tasks
  const groupTasks = (tasks) => {
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    return tasks.reduce(
      (groups, task) => {
        const due = new Date(task.date);
        due.setHours(0, 0, 0, 0);

        if (due.getTime() === tomorrow.getTime()) {
          groups.tomorrow.push(task);
        } else if (due > tomorrow && due <= endOfWeek) {
          groups.thisWeek.push(task);
        }

        return groups;
      },
      {
        tomorrow: [],
        thisWeek: [],
      },
    );
  };

  const groupedTasks = groupTasks(upcomingTasks);

  const hasAnyUpcoming = upcomingTasks.length > 0;

  // handle date change and prevent user from changing it from browser dev tools
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (selectedDate >= minDate) {
      setUpcomingDate(selectedDate);
    }
  };
  // tomorrow handler
  const handleTomorrowClick = () => {
    setUpcomingDate(tomorrowISO);
  };

  // this week handler
  const handleWeekClick = () => {
    if (groupedTasks.thisWeek.length > 0) {
      setUpcomingDate(groupedTasks.thisWeek[0].dueDate);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold underline'>Upcoming Tasks</h1>

        <div className='flex gap-3'>
          <input
            type='date'
            value={upcomingDate}
            min={minDate}
            onChange={handleDateChange}
            className='bg-white border border-gray-300 px-3 py-2 rounded-md cursor-pointer 
                     focus:outline-none focus:ring-2 focus:ring-black transition'
          />

          {upcomingDate && (
            <button
              onClick={() => setUpcomingDate('')}
              className='border px-3 py-1 bg-gray-200'
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {upcomingDate ? (
        // selected date view
        <div className='max-w-full py-3 px-4 bg-yellow-400'>
          <h2 className='text-3xl font-semibold mb-5'>
            {upcomingDate ? formatDate(upcomingDate) : 'All Upcoming Tasks'}
          </h2>

          <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
            {loading ? (
              <p>Loading...</p>
            ) : filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCardMin key={task._id} task={task} />
              ))
            ) : (
              <p>No tasks found.</p>
            )}
          </div>
        </div>
      ) : hasAnyUpcoming ? (
        <>
          {/* Tomorrow */}
          {groupedTasks.tomorrow.length > 0 && (
            <div className='max-w-full py-3 px-4 bg-yellow-400'>
              <h2
                onClick={handleTomorrowClick}
                className='text-3xl font-semibold mb-5 cursor-pointer hover:text-gray-700 transition'
              >
                Tomorrow
              </h2>

              <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
                {groupedTasks.tomorrow.map((task) => (
                  <TaskCardMin key={task._id} task={task} />
                ))}
              </div>
            </div>
          )}

          {/* This Week */}
          {groupedTasks.thisWeek.length > 0 && (
            <div className='max-w-full py-3 px-4 bg-yellow-400'>
              <h2
                onClick={handleWeekClick}
                className='text-3xl font-semibold mb-5 cursor-pointer hover:text-gray-700 transition'
              >
                This Week
              </h2>

              <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
                {groupedTasks.thisWeek.map((task) => (
                  <TaskCardMin key={task._id} task={task} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='py-10 bg-yellow-400'>
          <p className='text-center text-gray-800 font-medium'>
            No upcoming tasks
          </p>
        </div>
      )}
    </div>
  );
}

export default UpcomingTask;
