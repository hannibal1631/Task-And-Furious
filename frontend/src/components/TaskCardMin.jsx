import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMaximize } from '@fortawesome/free-solid-svg-icons';

function TaskCardMin({ task = {}, onOpen }) {
  return (
    <div
      className='bg-green-700 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl 
    px-4 sm:px-5 py-3 flex flex-col gap-4 sm:gap-5 
    rounded-2xl transition-all hover:scale-[1.02] sm:hover:scale-105'
    >
      {/* Header */}
      <div className='flex justify-between items-start sm:items-center gap-3'>
        <h3 className='text-lg sm:text-2xl lg:text-3xl font-semibold leading-tight wrap-break-word'>
          {task.title}
        </h3>

        <FontAwesomeIcon
          icon={faMaximize}
          className='text-lg sm:text-xl lg:text-2xl cursor-pointer hover:text-white shrink-0'
          onClick={onOpen}
        />
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 sm:gap-3'>
        <span className='text-xs sm:text-sm lg:text-base bg-red-500 py-1 px-2 rounded-md whitespace-nowrap'>
          {task.priority}
        </span>
        <span className='text-xs sm:text-sm lg:text-base bg-red-500 py-1 px-2 rounded-md whitespace-nowrap'>
          Active
        </span>
      </div>

      {/* Description */}
      <div className='bg-red-300 line-clamp-3 py-2 px-2 rounded-md'>
        <p className='text-sm sm:text-base leading-relaxed'>
          {task.description}
        </p>
      </div>
    </div>
  );
}

export default TaskCardMin;
