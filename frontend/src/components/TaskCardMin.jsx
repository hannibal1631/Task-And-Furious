import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

function TaskCardMin({ task = {}, onOpen, setSelectedTask }) {
  return (
    <div
      className='bg-green-700 w-full lg:w-76 lg:h-50
    px-4 sm:px-5 py-3 flex flex-col gap-4 sm:gap-5 
    rounded-2xl transition-all hover:scale-[1.02] sm:hover:scale-105'
    >
      {/* Header */}
      <div className='flex justify-between items-start sm:items-center gap-3'>
        <h3 className='text-lg sm:text-2xl lg:text-3xl font-semibold leading-tight line-clamp-1'>
          {task.title}
        </h3>

        <FontAwesomeIcon
          icon={faExpand}
          className='text-lg sm:text-xl lg:text-2xl cursor-pointer hover:text-white shrink-0'
          onClick={() => {
            if (setSelectedTask) {
              setSelectedTask(task);
            }
            onOpen();
          }}
        />
      </div>

      {/* Tags */}
      <div className='flex flex-wrap gap-2 sm:gap-3'>
        <span
          className={`text-xs sm:text-sm lg:text-base py-1 px-2 rounded-md whitespace-nowrap capitalize ${task.priority === 'low' ? 'bg-green-500' : task.priority === 'medium' ? 'bg-yellow-500' : 'bg-red-500'}`}
        >
          {task.priority}
        </span>
        <span
          className={`text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md capitalize
          ${task.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}
        >
          {task.status}
        </span>
        <span className='text-xs sm:text-sm lg:text-base px-2 py-1 rounded-md bg-yellow-500'>
          {task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}
        </span>
      </div>

      {/* Description */}
      <div className='bg-red-300 py-2 px-2 rounded-md'>
        <p className='text-sm sm:text-base leading-relaxed line-clamp-2'>
          {task.description}
        </p>
      </div>
    </div>
  );
}

export default TaskCardMin;
