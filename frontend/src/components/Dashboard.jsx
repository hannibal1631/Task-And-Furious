import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
  faPalette,
  faBell,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <main>
      <div className='bg-blue-900 h-screen max-w-full'>
        {/* upper section with logo, searchbar and notification/theme/profile buttons */}
        <div className='flex items-center bg-yellow-300 m-auto py-4 px-7'>
          <div className='shrink-0'>
            <img
              src='./hero-logo.png'
              alt='task-and-furious'
              className='w-40 h-25'
            />
          </div>
          <div className='flex-1 flex justify-center'>
            <div className='flex items-center justify-between w-100 gap-2 px-3 py-2 border-2 border-gray-400 rounded-2xl focus-within:border-black transition'>
              <input
                type='text'
                placeholder='Search tasks...'
                className='outline-none bg-transparent w-[90%]'
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className='text-gray-500 text-lg cursor-pointer'
              />
            </div>
          </div>
          <div className='flex shrink-0 items-center gap-4'>
            <FontAwesomeIcon icon={faBell} className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white' />
            <FontAwesomeIcon icon={faPalette} className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white' />
            <FontAwesomeIcon icon={faCircleUser} className='lg:text-4xl text-2xl hover:cursor-pointer hover:text-white' />
          </div>
        </div>
        {/* lower section of the body with all navs/tasks/progress */}
        <div>
          <div>sidebar</div>
          <div>body</div>
          <div>progress</div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
