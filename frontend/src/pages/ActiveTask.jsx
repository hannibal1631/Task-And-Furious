import { useState } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useOutletContext } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

function ActiveTask() {
  const { setView, setSelectedTask } = useOutletContext();
  const {activeTasks, loading} = useTasks()

  const [selectedPriority, setSelectedPriority] = useState(null);

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
          ? 'bg-slate-700 text-orange-100 font-semibold'
          : 'bg-neutral-400 hover:bg-neutral-300'
      }`}
          >
            {priority.label}
          </button>
        ))}
      </div>

      <div className='max-w-full py-3 px-3 rounded-xl bg-neutral-800'>
        <h2 className='text-4xl font-semibold text-orange-100 mb-5'>{formattedDate}</h2>

        <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
          {loading ? (
            <p className='col-span-3 text-center text-orange-100'>Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className='col-span-3 text-center text-orange-100'>No active tasks right now.</p>
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
