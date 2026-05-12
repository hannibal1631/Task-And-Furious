import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

function TaskCardMin({ task = {}, onOpen, setSelectedTask }) {
  return (
    <div
      className='bg-neutral-600 w-full lg:w-76 lg:h-50
    px-3 py-3 flex flex-col gap-4 sm:gap-5 
    rounded-2xl transition-all ease-in-out hover:scale-[1.02] sm:hover:scale-105'
    >
      {/* Header */}
      <div className='flex justify-between items-start sm:items-center gap-3'>
        <h3 className='text-lg sm:text-2xl lg:text-3xl font-semibold text-orange-100 leading-tight line-clamp-1'>
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
      <div className='flex flex-wrap gap-2'>
        <span
          className={`text-xs sm:text-sm lg:text-base font-semibold p-1 rounded-md whitespace-nowrap capitalize ${task.priority === 'low' ? 'bg-green-500 text-slate-700' : task.priority === 'medium' ? 'bg-yellow-500 text-slate-700' : 'bg-red-500 text-orange-100'}`}
        >
          {task.priority}
        </span>
        {(() => {
          const now = new Date();

          const taskDate = task.date ? new Date(task.date) : null;

          const isFailed =
            task.status !== 'completed' && taskDate && taskDate < now;

          const displayStatus = isFailed ? 'failed' : task.status;

          return (
            <span
              className={`text-xs sm:text-sm lg:text-base font-semibold p-1 rounded-md capitalize
      ${
        displayStatus === 'completed'
          ? 'bg-green-500 text-slate-700'
          : displayStatus === 'failed'
            ? 'bg-red-500 text-orange-100'
            : 'bg-yellow-500 text-slate-700'
      }`}
            >
              {displayStatus}
            </span>
          );
        })()}
        <span className='text-xs sm:text-sm lg:text-base font-semibold p-1 rounded-md bg-neutral-500 text-orange-100'>
          {task.date ? new Date(task.date).toLocaleDateString() : 'N/A'}
        </span>
      </div>

      {/* Description */}
      <div className='bg-neutral-500 py-2 px-2 rounded-md'>
        <p className='text-sm sm:text-base text-orange-100 leading-relaxed line-clamp-2'>
          {task.description}
        </p>
      </div>
    </div>
  );
}

export default TaskCardMin;
