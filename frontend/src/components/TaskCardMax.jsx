import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faTrash,
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

function TaskCardMax({ task, onEdit, onClose }) {
  if(!task) return null

  return (
    <div
      className='bg-blue-900 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl
      px-4 sm:px-5 py-4 flex flex-col gap-5 rounded-2xl relative'
    >
      {/* Header */}
      <div className='flex justify-between items-start gap-3'>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-semibold wrap-break-word'>
          {task.title || "Task Title"}
        </h2>

        <button
          onClick={onClose}
          className='text-lg sm:text-xl hover:text-red-400 transition cursor-pointer'
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Status */}
      <div className='flex flex-wrap gap-2 sm:gap-3'>
        <span className='bg-red-500 text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md'>
          {task.priority}
        </span>
        <span className='bg-green-500 text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md'>
          {task.status}
        </span>
      </div>

      {/* Due Date & Time */}
      <div className='flex flex-wrap gap-3 text-sm sm:text-base'>
        <span className='bg-blue-700 px-2 py-1 rounded-md'>
          Due: {task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}
        </span>
        <span className='bg-blue-700 px-2 py-1 rounded-md'>Time: {task.time || 'N/A'}</span>
      </div>

      {/* Description */}
      <div className='bg-blue-800 p-3 rounded-md'>
        <p className='text-sm sm:text-base leading-relaxed'>
          {task.description}
        </p>
      </div>

      {/* Actions */}
      <div className='flex flex-wrap gap-2 sm:gap-3 mt-2'>
        <button
          onClick={onEdit}
          className='flex items-center gap-2 bg-yellow-500 px-3 py-2 rounded-md text-sm sm:text-base cursor-pointer'
        >
          <FontAwesomeIcon icon={faPen} />
          Edit
        </button>

        <button className='flex items-center gap-2 bg-red-600 px-3 py-2 rounded-md text-sm sm:text-base cursor-pointer'>
          <FontAwesomeIcon icon={faTrash} />
          Delete
        </button>

        <button className='flex items-center gap-2 bg-green-600 px-3 py-2 rounded-md text-sm sm:text-base cursor-pointer'>
          <FontAwesomeIcon icon={faCheck} />
          Complete
        </button>
      </div>
    </div>
  );
}

export default TaskCardMax;
