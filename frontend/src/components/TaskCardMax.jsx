import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../config/api.js';

function TaskCardMax({ task, onEdit, onClose }) {
  if (!task) return null;

  // delete task handler
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${task._id}`, {
        withCredentials: true,
      });

      console.log('Task Deleted');
      onClose();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  // toggle status handler
  const handleToggleComplete = async () => {
    try {
      const newStatus = task.status === 'completed' ? 'pending' : 'completed';

      await axios.patch(
        `${API_BASE_URL}/tasks/${task._id}`,
        { status: newStatus },
        { withCredentials: true },
      );

      console.log('Status Updated');
      onClose();
    } catch (err) {
      console.error('Status update failed', err);
    }
  };

  return (
    <div
      className='bg-neutral-600 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl
      px-4 sm:px-5 py-4 flex flex-col gap-5 rounded-2xl relative'
    >
      {/* Header */}
      <div className='flex justify-between items-start gap-3'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl text-orange-100 font-semibold wrap-break-word'>
          {task.title || 'Task Title'}
        </h2>

        <button
          onClick={onClose}
          className='text-lg sm:text-xl hover:text-red-400 transition cursor-pointer'
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Status */}
      <div className='flex flex-wrap gap-2 sm:gap-3 font-semibold'>
        <span
          className={`text-xs sm:text-sm lg:text-base p-1 rounded-md whitespace-nowrap capitalize ${task.priority === 'low' ? 'bg-green-500 text-slate-700' : task.priority === 'medium' ? 'bg-yellow-500 text-slate-700' : 'bg-red-500 text-orange-100'}`}
        >
          {task.priority}
        </span>
        <span
          className={`text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md capitalize
          ${
            task.status === 'completed'
              ? 'bg-green-500 text-slate-700'
              : task.status === 'failed'
                ? 'bg-red-500 text-orange-100'
                : 'bg-yellow-500 text-slate-700'
          }`}
        >
          {task.status}
        </span>
        <span className='bg-neutral-500 text-orange-100 px-2 py-1 rounded-md'>
          Due Date: {task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}
        </span>
        <span className='bg-neutral-500 text-orange-100 px-2 py-1 rounded-md'>
          Due Time: {task.time || 'N/A'}
        </span>
      </div>

      {/* Description */}
      <div className='bg-neutral-500 text-orange-100 p-3 rounded-md'>
        <p className='text-sm sm:text-base leading-relaxed'>
          {task.description}
        </p>
      </div>

      {/* Actions */}
      <div className='flex flex-wrap gap-2 sm:gap-3 mt-2 font-semibold'>
        <button
          onClick={onEdit}
          className='flex items-center gap-2 bg-yellow-500 text-slate-700 px-3 py-2 rounded-md text-sm sm:text-base cursor-pointer transition-all ease-in-out duration-200 hover:scale-105 hover:text-slate-800'
        >
          <FontAwesomeIcon icon={faPen} />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className='flex items-center gap-2 bg-red-600 text-orange-100 px-3 py-2 rounded-md text-sm sm:text-base cursor-pointer transition-all ease-in-out duration-200 hover:scale-105'
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>

        <button
          onClick={handleToggleComplete}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm sm:text-base cursor-pointer transition-all ease-in-out duration-200 hover:scale-105
          ${task.status === 'completed' ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-600 hover:text-slate-800'}`}
        >
          <FontAwesomeIcon icon={faCheck} />
          {task.status === 'completed' ? 'Mark Pending' : 'Mark Completed'}
        </button>
      </div>
    </div>
  );
}

export default TaskCardMax;
