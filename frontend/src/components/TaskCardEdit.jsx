import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function TaskCardEdit({ onClose }) {
  const { user, loading } = useAuth();

  const [today] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0];
  });

  const [currentTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  });

  // formdata
  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    priority: 'low',
    date: '',
    time: '',
    description: '',
  });

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // add task handler
  const handleAddTask = async () => {
    if(loading){
      console.error("User no loaded yet");
      return
    }


    if (!user?._id) {
      console.error('User not loaded yet');
      return;
    }

    if (!formData.categoryId) {
      console.error('Category not selected');
      return;
    }
    try {
      console.log('USER:', user);
      console.log('USER ID:', user._id);
      console.log('CATEGORY ID:', formData.categoryId);

      const res = await axios.post(
        `${API_BASE_URL}/tasks/${user._id}/${formData.categoryId}`,
        {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          status: 'pending',
          date: formData.date ? new Date(formData.date) : null,
          time: formData.time,
        },
        {
          withCredentials: true
        }
      );
      console.log('Task Created', res.data);
      onClose();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

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
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      {/* Category + Priority */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Category</label>
          <select
            className='bg-white p-2 rounded-md text-sm sm:text-base cursor-pointer'
            name='categoryId'
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value=''>select</option>
            <option value='CATEGORY_ID_1'>Personal</option>
            <option value='CATEGORY_ID_2'>Study</option>
          </select>
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Priority</label>
          <select
            className='bg-white p-2 rounded-md text-sm sm:text-base cursor-pointer'
            name='priority'
            value={formData.priority}
            onChange={handleChange}
          >
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
      </div>

      {/* Date + Time */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Due Date</label>
          <input
            type='date'
            name='date'
            value={formData.date}
            onChange={handleChange}
            min={today}
            className='bg-white p-2 rounded-md text-sm sm:text-base'
          />
        </div>

        <div className='flex flex-col gap-1 w-full'>
          <label className='text-sm sm:text-base'>Due Time</label>
          <input
            type='time'
            name='time'
            value={formData.time}
            onChange={handleChange}
            min={currentTime}
            className='bg-white p-2 rounded-md text-sm sm:text-base'
          />
        </div>
      </div>

      {/* Description */}
      <div className='flex flex-col gap-1'>
        <label className='text-sm sm:text-base'>Description</label>
        <textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder='Enter task details...'
          className='bg-white p-2 rounded-md text-sm sm:text-base outline-none resize-none'
        />
      </div>

      {/* Buttons */}
      <div className='flex flex-wrap gap-3 mt-2'>
        <button
          disabled={loading}
          className='bg-green-600 px-4 py-2 rounded-md text-sm sm:text-base cursor-pointer'
          onClick={handleAddTask}
        >
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
