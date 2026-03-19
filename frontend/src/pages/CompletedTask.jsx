import { useState, useEffect } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';

function CompletedTask() {
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/tasks?status=completed&date=${selectedDate}`,
        );
        const data = await res.json();

        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [selectedDate]);

  return (
    <div className='flex flex-col gap-6'>
      {/* Header Row */}
      <div className='flex items-center justify-between flex-wrap gap-4'>
        <h1 className='text-4xl font-bold underline'>Completed Task</h1>

        <input
          type='date'
          max={today}
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className='bg-white border border-gray-300 px-3 py-2 rounded-md cursor-pointer 
                     focus:outline-none focus:ring-2 focus:ring-black transition'
        />
      </div>

      {/* Cards Section */}
      <div className='max-w-full py-4 px-5 bg-yellow-400 rounded-lg shadow-sm'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {tasks.length > 0 ? (
            tasks.map((task) => <TaskCardMin key={task._id} task={task} />)
          ) : (
            <p className='col-span-full text-center text-gray-800 font-medium'>
              No completed tasks for this date
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompletedTask;
