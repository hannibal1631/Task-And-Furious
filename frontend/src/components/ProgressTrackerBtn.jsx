import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faXmark } from '@fortawesome/free-solid-svg-icons';

function ProgressTrackerBtn({ isOpen, toggle }) {
  return (
    <>
      {/* BUTTON */}
      <button
      title='progress status'
        onClick={toggle}
        className='
          absolute bottom-20 right-6 z-40
          bg-blue-800 hover:bg-blue-700
          text-white
          p-4 rounded-full
          shadow-lg
          transition-all duration-200
          hover:scale-105 active:scale-95 cursor-pointer
        '
      >
        <FontAwesomeIcon icon={faChartLine} />
      </button>

      {/* PANEL */}
      {isOpen && (
        <div
          className='
            absolute bottom-36 right-6 z-40
            w-60
            bg-blue-900
            rounded-xl
            shadow-xl
            p-4
            flex flex-col gap-4
          '
        >
          {/* Header */}
          <div className='flex justify-between items-center'>
            <h2 className='text-lg sm:text-xl font-semibold'>Progress</h2>

            <button onClick={toggle}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          {/* Stats */}
          <div className='bg-sky-500 p-3 rounded-lg'>
            <h3 className='text-sm font-semibold'>Upcoming Tasks</h3>
            <p className='text-lg'>10</p>
          </div>

          <div className='bg-sky-500 p-3 rounded-lg'>
            <h3 className='text-sm font-semibold'>Ongoing Tasks</h3>
            <p className='text-lg'>10</p>
          </div>

          <div className='bg-sky-500 p-3 rounded-lg'>
            <h3 className='text-sm font-semibold'>Completed Tasks</h3>
            <p className='text-lg'>10</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ProgressTrackerBtn;
