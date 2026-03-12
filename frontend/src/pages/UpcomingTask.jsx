import { useState } from 'react';
import TaskCardMin from '../components/TaskCardMin.jsx';

function UpcomingTask() {
  const [upcomingDate, setUpcomingDate] = useState('');

  // temporary tasks (later comes from backend)
  const tasks = [
    { id: 1, title: 'Design UI', dueDate: '2026-03-11' },
    { id: 2, title: 'Write API docs', dueDate: '2026-03-12' },
    { id: 2, title: 'Write API docs', dueDate: '2026-03-13' },
    { id: 3, title: 'Fix navbar', dueDate: '2026-03-14' },
    { id: 4, title: 'Update dashboard', dueDate: '2026-03-18' },
  ];

  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const tomorrowISO = tomorrow.toISOString().split('T')[0];

  const minDate = tomorrow.toISOString().split('T')[0];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const groupTasks = (tasks) => {
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const endOfWeek = new Date();
    endOfWeek.setDate(today.getDate() + 7);

    return tasks.reduce(
      (groups, task) => {
        const due = new Date(task.dueDate);

        if (due.toDateString() === tomorrow.toDateString()) {
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

  const groupedTasks = groupTasks(tasks);

  const selectedTasks = tasks.filter((task) => task.dueDate === upcomingDate);

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
            className='bg-white border-2 border-gray-500 cursor-pointer px-2'
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
            {formatDate(upcomingDate)}
          </h2>

          <div className='grid grid-cols-3 gap-y-8 gap-x-6'>
            {selectedTasks.length ? (
              selectedTasks.map((task) => <TaskCardMin key={task.id} />)
            ) : (
              <p>No tasks for this date.</p>
            )}
          </div>
        </div>
      ) : (
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
                  <TaskCardMin key={task.id} />
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
                  <TaskCardMin key={task.id} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UpcomingTask;
