import { useState } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';

function ActiveTask() {
  const [selectedPriority, setSelectedPriority] = useState(null);

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];


  // temporary tasks (later comes from backend)
  const tasks = [
    { id: 1, title: 'Design UI', dueDate: '2026-03-12' },
    { id: 2, title: 'Fix navbar', dueDate: '2026-03-12' },
    { id: 3, title: 'Update dashboard', dueDate: '2026-03-15' },
  ];

  const today = new Date();

  // YYYY-MM-DD for filtering
  const todayISO = today.toISOString().split('T')[0];

  // Mar 12, 2026 for display
  const formattedDate = `Today — ${today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  // filter today's tasks
  const todayTasks = tasks.filter((task) => task.dueDate === todayISO);

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold underline'>Active Tasks</h1>
      </div>

      <div className='flex flex-wrap gap-3'>
        {priorities.map((priority) => (
          <button
            key={priority.value}
            onClick={() => setSelectedPriority(priority)}
            className={`px-4 py-2 rounded-full border transition cursor-pointer
      ${
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
          {todayTasks.length > 0 ? (
            todayTasks.map((task) => <TaskCardMin key={task.id} />)
          ) : (
            <p>No active tasks for today.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveTask;