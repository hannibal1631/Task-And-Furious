import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function TaskCardEdit({ onClose }) {
  const [today] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  });

  const [currentTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });

  return (
    <div
      className='bg-blue-500 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl
      px-4 sm:px-5 py-4 flex flex-col gap-5 rounded-2xl'
    >
      {/* Header */}
      <div className='flex justify-between items-center'>
        <h2 className='text-xl sm:text-2xl font-semibold'>Add Your Task</h2>

        <button
          onClick={onClose}
          className='text-lg sm:text-xl hover:text-red-400 transition cursor-pointer'
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Title */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm sm:text-base'>Title</label>
        <input
          type='text'
          placeholder='Enter title'
          className='bg-white p-2 rounded-md text-sm sm:text-base outline-none'
        />
      </div>

      {/* Category + Priority */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Category</label>
          <select className='bg-white p-2 rounded-md text-sm sm:text-base cursor-pointer'>
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Priority</label>
          <select className='bg-white p-2 rounded-md text-sm sm:text-base cursor-pointer'>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Date + Time */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Due Date</label>
          <input
            type='date'
            min={today}
            className='bg-white p-2 rounded-md text-sm sm:text-base'
          />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Due Time</label>
          <input
            type='time'
            min={currentTime}
            className='bg-white p-2 rounded-md text-sm sm:text-base'
          />
        </div>
      </div>

      {/* Description */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm sm:text-base'>Description</label>
        <textarea
          rows={4}
          placeholder='Enter task details...'
          className='bg-white p-2 rounded-md text-sm sm:text-base outline-none resize-none'
        />
      </div>

      {/* Buttons */}
      <div className='flex flex-wrap gap-3 mt-2'>
        <button className='bg-green-600 px-4 py-2 rounded-md text-sm sm:text-base cursor-pointer'>
          Add Task
        </button>

        <button
          onClick={onClose}
          className='bg-red-500 px-4 py-2 rounded-md text-white text-sm sm:text-base cursor-pointer'
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TaskCardEdit;
