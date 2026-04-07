import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddTaskButton({ onClick }) {
  return (
    <button
        title='add new task'
      onClick={onClick}
      className='
        absolute bottom-6 right-6 z-40
        flex items-center gap-2
        bg-green-600 hover:bg-green-700
        text-white
        px-4 py-3 rounded-full
        shadow-lg
        transition-all duration-200
        hover:scale-105 active:scale-95 cursor-pointer
      '
    >
      <FontAwesomeIcon icon={faPlus} />

      <span className='hidden sm:inline text-sm sm:text-base font-medium'>
        Add Task
      </span>
    </button>
  );
}

export default AddTaskButton;
