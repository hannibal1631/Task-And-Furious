import { useState, useEffect } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';
import { useTasks } from '../context/TaskContext.jsx';
import { useOutletContext } from 'react-router-dom';

function FailedTask() {
  const { setView, setSelectedTask } = useOutletContext();
  // yesterday date
  const getYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  };

  const yesterday = getYesterday();

  const [selectedDate, setSelectedDate] = useState('');
  const { tasks, loading } = useTasks();

  // new fetching logic for failed tasks
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const filteredTasks = tasks.filter((task) => {
    if (!task.date) return false;

    const taskDate = new Date(task.date);

    const isFailed = task.status !== 'completed' && taskDate < now;

    if (!isFailed) return false;

    if (selectedDate) {
      return task.date.split('T')[0] === selectedDate;
    }

    return (
      taskDate.getMonth() === currentMonth &&
      taskDate.getFullYear() === currentYear
    );
  });

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <div>
          <h1 className='text-4xl font-bold underline'>Failed Task</h1>
        </div>

        <div className='flex gap-3'>
          <input
            type='date'
            max={yesterday}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className='bg-orange-100 border border-gray-300 px-3 py-2 rounded-md cursor-pointer 
                     focus:outline-none focus:ring-2 focus:ring-slate-600 transition'
          />

          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              className='border px-3 py-1 bg-orange-100 hover:bg-slate-600 hover:text-orange-100 rounded-md cursor-pointer transition-all ease-in-out'
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Cards */}
      <div className='max-w-full py-3 px-3 bg-neutral-800 rounded-xl shadow-sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading ? (
            <p className='col-span-full text-center text-orange-100 font-medium'>
              Loading...
            </p>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCardMin
                key={task._id}
                task={task}
                setSelectedTask={setSelectedTask}
                onOpen={() => setView('max')}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-orange-100 font-medium'>
              No failed tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FailedTask;
