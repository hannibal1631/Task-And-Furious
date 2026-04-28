import { useState, useEffect } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useOutletContext } from 'react-router-dom';

function ActiveTask() {
  const { user } = useAuth();
  const { setView, setSelectedTask } = useOutletContext();

  const [selectedPriority, setSelectedPriority] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetching tasks from backend
  useEffect(() => {
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

    fetchTasks();
  }, [user]);

  // active task filtering logic
  const now = new Date();

  const todayISO = now.toLocaleDateString('en-CA');
  const currentTime = now.toTimeString().slice(0, 5);

  const activeTasks = tasks.filter((task) => {
    if (!task.date) return false;

    const taskDate = new Date(task.date).toLocaleDateString('en-CA');

    return task.status === 'pending' && taskDate === todayISO;
  });

  // priority filter task
  const filteredTasks = selectedPriority
    ? activeTasks.filter((t) => t.priority === selectedPriority.value)
    : activeTasks;

  const priorities = [
    {value: 'all', label: 'All'},
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const today = new Date();

  const formattedDate = `Today — ${today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold underline'>Active Tasks</h1>
      </div>

      <div className='flex flex-wrap gap-3'>
        {priorities.map((priority) => (
          <button
            key={priority.value}
            onClick={() => {
              if (priority.value === 'all') {
                setSelectedPriority(null);
              } else {
                setSelectedPriority(priority);
              }
            }}
            className={`px-4 py-2 rounded-full border transition cursor-pointer
      ${
        (priority.value === 'all' && !selectedPriority) ||
        selectedPriority?.value === priority.value
          ? 'bg-black text-white'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
          >
            {priority.label}
          </button>
        ))}
      </div>

      <div className='max-w-full py-3 px-4 bg-yellow-400'>
        <h2 className='text-4xl font-semibold mb-5'>{formattedDate}</h2>

        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          {loading ? (
            <p className='col-span-3 text-center'>Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className='col-span-3 text-center'>No active tasks right now.</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskCardMin
                key={task._id}
                task={task}
                onOpen={() => {
                  setSelectedTask(task);
                  setView('max');
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveTask;
